<script>
  import { Router, ChunkGenerator } from "../src/index";
  import chunk from "./Chunk.svelte";

  import DefaultPage from "./pages/DefaultPage.svelte";
  import TestPage from "./pages/TestPage.svelte";

  import Navigator from "./components/Navigator.svelte";

  const config = {
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
</script>

<h1>Welcome to Routve!</h1>

<br />

<Navigator />

<br />
<br />

<Router routerConfig="{config}" />
