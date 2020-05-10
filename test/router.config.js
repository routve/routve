import { ChunkGenerator } from "../src/index";

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
      component: ChunkGenerator(() => import("./pages/TestPageAsync.svelte")),
    },
    "*": {
      component: () => import("./pages/Error404.svelte"),
    },
  },
};
