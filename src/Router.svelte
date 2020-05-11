<script>
  import { onDestroy } from "svelte";
  import { get } from "svelte/store";
  import page from "page";
  import Config from "./router.config";
  import ChunkGenerator from "./ChunkGenerator";

  import DefaultChunkComponent from "./Chunk.svelte";

  import {
    path,
    subRouterRoutesByBasePath,
    basePageInstance,
  } from "./RouterStore";

  export let routerConfig = Config;
  export let hidden = false;

  let props = {};
  let component = null;

  const mainBasePath = routerConfig.basePath || "";
  export let basePath = mainBasePath;

  const nestedRoute = basePath !== mainBasePath;
  const pageInstance = nestedRoute ? page.create() : basePageInstance;

  export let routes = nestedRoute
    ? $subRouterRoutesByBasePath[basePath]
    : routerConfig.routes;

  pageInstance.base(basePath);

  function parseRoute(ctx, next) {
    if (get(path) !== ctx.pathname) path.set(ctx.pathname);

    next();
  }

  if (!nestedRoute) {
    pageInstance("*", parseRoute);
  }

  (function setupRouter(
    paths,
    parent = "",
    parentHandler = null,
    parentPath = "",
    parentComponent = null
  ) {
    Object.keys(paths).forEach((path) => {
      const route = paths[path];

      if (route.component.name === "component")
        route.component = ChunkGenerator(
          route.component,
          route.chunk || routerConfig.chunk || DefaultChunkComponent
        );

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

        Object.keys(context.params).forEach((key) =>
          key !== "0" &&
          path !== "*" &&
          route.component !== parentComponent &&
          path.includes(":" + key)
            ? (params[key] = context.params[key])
            : null
        );

        component = route.component;

        if (
          route.component.name === "component" ||
          route.component.name === "SvelteComponentHook"
        )
          props = {
            component: route.component,
            params,
          };
        else props = params;
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

  pageInstance.start();

  if (nestedRoute) {
    const pathUnsubscribe = path.subscribe((value) => {
      if (value.startsWith(pageInstance.base())) {
        pageInstance(value);
      }
    });

    onDestroy(pathUnsubscribe);
    onDestroy(() =>
      subRouterRoutesByBasePath.update((list) => {
        const newList = [];

        Object.keys(list)
          .filter((key) => key !== pageInstance.base())
          .forEach((key) => (newList[key] = list[key]));

        return newList;
      })
    );
  }

  onDestroy(() => pageInstance.stop());
</script>

<div hidden="{hidden}">
  <svelte:component this="{component}" {...props} />
</div>
