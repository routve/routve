import { ChunkGenerator } from "../src/index";
import chunk from "./Chunk.svelte";

import DefaultPage from "./pages/DefaultPage.svelte";
import TestPage from "./pages/TestPage.svelte";

export default {
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
    "*": {
      component: () => import("./pages/Error404.svelte"),
      chunk
    },
  },
};
