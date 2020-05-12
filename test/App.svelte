<script>
  import Router, { beforeRouteEnter, afterRouteEnter, getPath, path } from "../src/index";
  import RouterConfig from "./router.config";
  import { onDestroy } from "svelte";

  import Navigator from "./components/Navigator.svelte";

  const beforeRouteEnterCallback = beforeRouteEnter((context, next) => {
    // console.log("BeforeRouteEnter " + context.pathname);

    next();
  });

  const afterRouteEnterCallback = afterRouteEnter((context, next) => {
    // console.log("afterRouteEnter " + getPath());

    next();
  });

  onDestroy(beforeRouteEnterCallback);
  onDestroy(afterRouteEnterCallback);
</script>

<h1>Welcome to Routve! Current route: {$path}</h1>

<br />

<Navigator />

<br />
<br />

<Router routerConfig="{RouterConfig}" />
