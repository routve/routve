<script context="module">
  import { basePageInstance } from "./RouterStore";
  import { get, readable } from "svelte/store";
  import { path, isPageLoading } from "./RouterStore";

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

  export const pathReadable = readable(getPath(), (set) => {
    const pathUnSubscriber = path.subscribe((value) => {
      set(value);
    });

    return function stop() {
      pathUnSubscriber();
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
  import Config from "./router.config";
  import ChunkGenerator from "./ChunkGenerator";
  import qs from "qs";

  import DefaultChunkComponent from "./Chunk.svelte";

  import { isRouteLoading, isComponentLoading } from "./RouterStore";

  export let routerConfig = Config;
  export let hidden = false;

  let props = {};
  let component = null;
  let subRoutes = null;
  let subBasePath = null;

  const nestedRoute = typeof getContext("route") !== "undefined";
  export let pageInstance = nestedRoute ? page.create() : basePageInstance;

  export let routes = nestedRoute ? getContext("route") : routerConfig.routes;

  export let basePath = nestedRoute
    ? getContext("basePath")
    : routerConfig.basePath || "";

  pageInstance.base(basePath);

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

  if (!nestedRoute) {
    pageInstance("*", parseBeforeRouteEnter);
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

      const handler = (context) => {
        if (
          typeof route.component.chunk === "undefined" &&
          typeof route.chunkGenerated === "undefined"
        ) {
          route.component = ChunkGenerator(
            route.component,
            route.chunk || routerConfig.chunk || DefaultChunkComponent
          ).chunk;

          route.chunkGenerated = true;
        }

        if (typeof route.component.chunk !== "undefined") {
          route.component = route.component.chunk;

          route.chunkGenerated = true;
        }

        if (route.children !== null && typeof route.children === "object") {
          subBasePath = basePath + path;
          subRoutes = route.children;
        } else {
          subRoutes = null;
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

        if (!nestedRoute) parseAfterRouteEnter(context);
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
    });
  else pageInstance.start();

  if (nestedRoute) {
    const pathUnsubscribe = path.subscribe((value) => {
      if (value.startsWith(pageInstance.base())) {
        pageInstance.redirect(value);
      }
    });

    onDestroy(pathUnsubscribe);
  }

  onDestroy(() => pageInstance.stop());
</script>

<div hidden="{hidden}">
  <svelte:component
    this="{component}"
    {...props}
    subRoutes="{subRoutes}"
    subBasePath="{subBasePath}"
  />
</div>
