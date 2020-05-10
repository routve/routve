import { ChunkGenerator } from "../src/index";

import DefaultPage from "./pages/DefaultPage.svelte";
import TestPage from "./pages/TestPage.svelte";

import NestedRoutePage from "./pages/NestedRoutePage.svelte";
import NestedDefaultPage from "./pages/NestedRoute/DefaultPage.svelte";
import NestedExamplePage from "./pages/NestedRoute/ExamplePage.svelte";

export default {
  routes: {
    "/": {
      component: DefaultPage,
    },
    "/test-page": {
      component: TestPage,
    },
    "/test-page-async": {
      component: ChunkGenerator(() => import("./pages/TestPageAsync.svelte")),
    },
    "/nested-route-page": {
      component: NestedRoutePage,
      children: {
        "" : {
          component: NestedDefaultPage
        },
        "/example": {
          component: NestedExamplePage
        }
      }
    },
    "*": {
      component: () => import("./pages/Error404.svelte"),
    },
  },
};
