<script>
  import { Router, ChunkGenerator, Chunk } from "../src/index";

  import DefaultPage from "./pages/DefaultPage.svelte";
  import TestPage from "./pages/TestPage.svelte";
  import Error404 from "./pages/Error404.svelte";

  import Navigator from "./components/Navigator.svelte";

  const ChunkComponent = ChunkGenerator(Chunk);

  const config = {
    routes: {
      "/": {
        component: DefaultPage,
      },
      "/test-page": {
        component: TestPage,
      },
      "/test-page-async": {
        component: ChunkComponent(() => import("./pages/TestPageAsync.svelte")),
      },
      "*": {
        component: Error404,
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
