<script>
  import { onDestroy } from "svelte";
  import { get } from "svelte/store";
  import page from "page";
  import Config from "./router.config";

  import {
    path,
    subRouterRoutesByBasePath,
    basePageInstance,
  } from "./RouterStore";

  import defaultChunkPage from "./Chunk.svelte";

  let props = {};
  let component = null;

  export let routerConfig = Config;

  export const mainBasePath = "";
  export let basePath = mainBasePath;

  const nestedRoute = basePath !== mainBasePath;

  export let routes = nestedRoute
    ? $subRouterRoutesByBasePath[basePath]
    : routerConfig.routes;
  export let hidden = false;

  const pageInstance = nestedRoute ? page.create() : basePageInstance;

  pageInstance.base(basePath);

  function parseRoute(ctx, next) {
    if (get(path) !== ctx.pathname) {
      path.set(ctx.pathname);
    }

    next();
  }

  if (!nestedRoute) {
    pageInstance("*", parseRoute);
  }

  // Load Chunk
  function chunk(dynamicImport, Component) {
    return class SvelteComponentHook {
      constructor(options) {
        options.props = {
          ...options.props,
          dynamicImport,
        };
        return new Component(options);
      }
    };
  }

  (function setupRouter(paths, parent = "", parentHandler = null) {
    Object.keys(paths).forEach((path) => {
      const route = paths[path];

      const handler = (context) => {
        if (route.children !== null && typeof route.children === "object") {
          subRouterRoutesByBasePath.update((value) => {
            value[basePath + path] = route.children;
            return value;
          });
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

        Object.keys(context.params).forEach((key) => {
          if (key !== "0" && path !== "*") {
            params[key] = context.params[key];
          }
        });

        const routeComponent =
          route.component.name === "component"
            ? chunk(route.component, routerConfig.chunk || defaultChunkPage)
            : route.component;

        component = routeComponent;

        if (
          route.component.name === "component" ||
          route.component.name === "SvelteComponentHook"
        )
          props = {
            component: routeComponent,
            params,
          };
        else props = params;
      };

      pageInstance(
        parent + path,
        parentHandler === null ? handler : parentHandler
      );

      if (route.children !== null && typeof route.children === "object") {
        setupRouter(
          route.children,
          parent + path,
          parentHandler === null ? handler : parentHandler
        );
      }
    });
  })(routes);

  pageInstance.start();

  if (nestedRoute) {
    const pathUnsubscribe = path.subscribe((value) => {
      if (value.startsWith(pageInstance.base())) {
        pageInstance(value);
      }
    });

    onDestroy(pathUnsubscribe);
    onDestroy(() => {
      subRouterRoutesByBasePath.update((list) => {
        const newList = [];

        Object.keys(list)
          .filter((key) => key !== pageInstance.base())
          .forEach((key) => {
            newList[key] = list[key];
          });

        return newList;
      });
    });
  }

  onDestroy(() => {
    pageInstance.stop();
  });
</script>

<div hidden="{hidden}">
  <svelte:component this="{component}" {...props} />
</div>
