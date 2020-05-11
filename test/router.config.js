import { ChunkGenerator } from "../src/index";
import chunk from "./Chunk.svelte";

import DefaultPage from "./pages/DefaultPage.svelte";
import TestPage from "./pages/TestPage.svelte";

export default {
  basePath: "",
  routes: {
    "/": {
      component: DefaultPage,
    },
    "/test-page": {
      component: TestPage,
    },
    "/test-page-async": {
      component: ChunkGenerator(() => import("./pages/TestPageAsync.svelte"), chunk),
    },
    "/nested-route-page": {
      component: () => import("./pages/NestedRoutePage.svelte"),
      children: {
        "" : {
          component: () => import("./pages/NestedRoute/DefaultPage.svelte")
        },
        "/example": {
          component: () => import("./pages/NestedRoute/ExamplePage.svelte")
        }
      }
    },
    "/nested-route-params-page": {
      component: () => import("./pages/NestedRouteParamsTestPage.svelte"),
      children: {
        "" : {
          component: () => import("./pages/NestedRouteParamsTest/DefaultPage.svelte")
        },
        "/example/:page": {
          component: () => import("./pages/NestedRouteParamsTest/ExamplePage.svelte")
        },
        "/:page": {
          component: () => import("./pages/NestedRouteParamsTest/ExampleParamPage.svelte")
        }
      }
    },
    "*": {
      component: () => import("./pages/Error404.svelte"),
      chunk
    },
  },
};
