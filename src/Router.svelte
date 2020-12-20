<script context="module">
  import { basePageInstance } from "./RouterStore";
  import { get, readable } from "svelte/store";
  import { path, routeName, isPageLoading } from "./RouterStore";

  let beforeRouteEnterCallbacks = [];
  let afterRouteEnterCallbacks = [];

  export function route(route) {
    basePageInstance(route);
  }

  export function beforeRouteEnter(callback) {
    beforeRouteEnterCallbacks.push(callback);

    return () => {
      beforeRouteEnterCallbacks = beforeRouteEnterCallbacks.filter(
        (item) => item !== callback
      );
    };
  }

  export function afterRouteEnter(callback) {
    afterRouteEnterCallbacks.push(callback);

    return () => {
      afterRouteEnterCallbacks = afterRouteEnterCallbacks.filter(
        (item) => item !== callback
      );
    };
  }

  export function getPath() {
    return get(path);
  }

  export function getRouteName() {
    return get(routeName);
  }

  export const pathReadable = readable(getPath(), (set) => {
    const pathUnSubscriber = path.subscribe((value) => {
      set(value);
    });

    return function stop() {
      pathUnSubscriber();
    };
  });

  export const routeNameReadable = readable(getRouteName(), (set) => {
    const routeNameUnSubscriber = routeName.subscribe((value) => {
      set(value);
    });

    return function stop() {
      routeNameUnSubscriber();
    };
  });

  export const isPageLoadingReadable = readable(get(isPageLoading), (set) => {
    const isPageLoadingUnSubscriber = isPageLoading.subscribe((value) => {
      set(value);
    });

    return function stop() {
      isPageLoadingUnSubscriber();
    };
  });
</script>

<script>
  import { onDestroy, getContext } from "svelte";
  import page from "page";
  import RouterConfig from "./router.config";
  import ChunkGenerator from "./ChunkGenerator";
  import qs from "qs";

  import DefaultChunkComponent from "./Chunk.svelte";

  import { isRouteLoading, isComponentLoading } from "./RouterStore";

  let props = {};
  let component = null;
  let subRouterContext = null;

  export let config = RouterConfig;

  const routerContext = getContext("routve.context");
  const nestedRoute =
    config === RouterConfig && typeof routerContext !== "undefined";

  export let hashbang = nestedRoute
    ? routerContext.hashbang
    : !!config.hashbang
    ? config.hashbang
    : false;
  export let pageInstance = nestedRoute ? page.create() : basePageInstance;
  export let routes = nestedRoute ? routerContext.subRoutes : config.routes;
  export let basePath = nestedRoute
    ? routerContext.parentBasePath +
      (hashbang && !routerContext.hashAdded ? "#!" : "") +
      routerContext.parentPath
    : config.basePath || "";
  export let hidden = false;

  pageInstance.base(basePath);

  if (!hashbang) isPageLoading.set(true);

  function parseBeforeRouteEnter(context, next) {
    if (get(path) !== context.canonicalPath) {
      isPageLoading.set(true);
      isRouteLoading.set(true);
      isComponentLoading.set(true);

      path.set(context.canonicalPath);

      if (beforeRouteEnterCallbacks.length > 0) {
        let currentCallbackIndex = 0;

        function invoke() {
          const nextHandler = () => {
            if (currentCallbackIndex === beforeRouteEnterCallbacks.length - 1) {
              beforeRouteEnterCallbacks[currentCallbackIndex](context, () => {
                next();
              });
            } else {
              currentCallbackIndex++;

              invoke();
            }
          };

          if (currentCallbackIndex <= beforeRouteEnterCallbacks.length - 1) {
            beforeRouteEnterCallbacks[currentCallbackIndex](
              context,
              nextHandler
            );
          }
        }

        invoke();
      } else {
        next();
      }
    } else {
    }
  }

  function parseAfterRouteEnter(context) {
    const componentLoaderHandler = () => {
      isRouteLoading.set(false);

      if (!get(isComponentLoading)) {
        isPageLoading.set(false);
      }
    };

    if (afterRouteEnterCallbacks.length > 0) {
      let currentCallbackIndex = 0;

      function invoke() {
        const nextHandler = () => {
          if (currentCallbackIndex === afterRouteEnterCallbacks.length - 1) {
            afterRouteEnterCallbacks[currentCallbackIndex](context, () => {
              componentLoaderHandler();
            });
          } else {
            currentCallbackIndex++;

            invoke();
          }
        };

        if (currentCallbackIndex <= afterRouteEnterCallbacks.length - 1) {
          afterRouteEnterCallbacks[currentCallbackIndex](context, nextHandler);
        }
      }

      invoke();
    } else componentLoaderHandler();
  }

  (function setupRouter(
    paths,
    parent = "",
    parentHandler = null,
    parentPath = "",
    parentComponent = null
  ) {
    Object.keys(paths).forEach((pathInPaths) => {
      let path;

      if (pathInPaths.includes("?")) {
        const pathSplit = pathInPaths.split("?");

        path = pathSplit[0];
      } else {
        path = pathInPaths;
      }

      const route = paths[pathInPaths];

      const routeHandler = (context) => {
        if (
          typeof route.component.chunk === "undefined" &&
          typeof route.chunkGenerated === "undefined"
        ) {
          route.component = ChunkGenerator(
            route.component,
            route.chunk || config.chunk || DefaultChunkComponent
          ).chunk;

          route.chunkGenerated = true;
        }

        if (typeof route.component.chunk !== "undefined") {
          route.component = route.component.chunk;

          route.chunkGenerated = true;
        }

        if (route.children !== null && typeof route.children === "object") {
          let hashAdded = !!routerContext ? routerContext.hashAdded : false;

          if (!!routerContext && !routerContext.hashAdded) hashAdded = true;

          subRouterContext = {
            rootBasePath: !!routerContext
              ? routerContext.rootBasePath
              : basePath,
            parentBasePath: basePath,
            parentPath: path,
            subRoutes: route.children,
            parentContext: routerContext,
            hashbang,
            hashAdded,
          };
        } else {
          if (!!route.name) {
            routeName.set(route.name);
          } else if (pathInPaths === "") {
            if (!!routerContext) {
              routeName.set(routerContext.parentPath + "/");
            } else {
              routeName.set("/");
            }
          } else {
            if (!!routerContext) {
              routeName.set(routerContext.parentPath + pathInPaths);
            } else {
              routeName.set(pathInPaths);
            }
          }

          subRouterContext = null;
        }

        let params = {};

        if (route.params !== null && typeof route.params === "object") {
          params = route.params;
        }

        if (
          route.context !== null &&
          typeof route.context === "boolean" &&
          route.context
        ) {
          params.context = context;
        }

        if (
          route.pageJsInstance !== null &&
          typeof route.pageJsInstance === "boolean" &&
          route.pageJsInstance
        ) {
          params.pageJsInstance = pageInstance;
        }

        const queryString = qs.parse(context.querystring);

        Object.keys(queryString).forEach((key) => {
          path !== "*" &&
          (pathInPaths.includes("?" + key) || pathInPaths.includes("&" + key))
            ? (params[key] = queryString[key])
            : null;
        });

        Object.keys(context.params).forEach((key) =>
          key !== "0" &&
          path !== "*" &&
          route.component !== parentComponent &&
          path.includes(":" + key)
            ? (params[key] = context.params[key])
            : null
        );

        component = route.component;

        props = {
          params,
        };

        if (!!route.afterRouteEnter) route.afterRouteEnter(context);

        if (!nestedRoute) parseAfterRouteEnter(context);
      };

      const handler = (context) => {
        const routeToHandler = () => {
          if (nestedRoute) routeHandler(context);
          else
            parseBeforeRouteEnter(context, () => {
              routeHandler(context);
            });
        };

        if (!!route.beforeRouteEnter)
          route.beforeRouteEnter(context, () => {
            routeToHandler();
          });
        else routeToHandler();
      };

      pageInstance(
        parent + path,
        parentHandler === null ? handler : parentHandler
      );

      if (route.children !== null && typeof route.children === "object")
        setupRouter(
          route.children,
          parent + path,
          parentHandler === null ? handler : parentHandler,
          parent,
          route.component
        );
    });
  })(routes);

  if (!nestedRoute) pageInstance("*", () => {});

  if (nestedRoute)
    pageInstance.start({
      click: false,
      popstate: false,
      dispatch: false,
      hashbang,
    });
  else pageInstance.start({ hashbang });

  if (nestedRoute) {
    const pathUnsubscribe = path.subscribe((value) => {
      if (
        value.startsWith(pageInstance.base()) ||
        (hashbang && value.startsWith(pageInstance.base().replaceAll("#!", "")))
      ) {
        if (hashbang && routerContext.rootBasePath !== "") {
          value = value.replace(pageInstance.base(), "");
          value = value.replace(pageInstance.base().replace("#!", ""), "");
        }

        pageInstance.show(
          (hashbang && !value.startsWith("#!") ? "#!" : "") + value,
          false,
          true,
          false
        );
      }
    });

    onDestroy(pathUnsubscribe);
  }

  onDestroy(() => pageInstance.stop());
</script>

<svelte:head>
  {#if hashbang && !nestedRoute}
    <base href="{basePath + '/'}" />
  {/if}
</svelte:head>

<div hidden="{hidden}">
  <svelte:component
    this="{component}"
    {...props}
    subRouterContext="{subRouterContext}"
  />
</div>
