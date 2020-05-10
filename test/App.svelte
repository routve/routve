<script>
  import { Router } from "../src/index";
  import chunk from "./Chunk.svelte";
  import RouterConfig from "./router.config";

  import Navigator from "./components/Navigator.svelte";
</script>

<h1>Welcome to Routve!</h1>

<br />

<Navigator />

<br />
<br />

<Router routerConfig="{RouterConfig}" />
