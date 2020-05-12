<script>
  import Router, { beforeRouteEnter, afterRouteEnter } from "../src/index";
  import RouterConfig from "./router.config";
  import { onDestroy } from "svelte";

  import Navigator from "./components/Navigator.svelte";

  const beforeRouteEnterCallback = beforeRouteEnter((context, next) => {
    // console.log("BeforeRouteEnter " + context.pathname);

    next();
  });

  const afterRouteEnterCallback = afterRouteEnter((context, next) => {
    // console.log("afterRouteEnter " + context.pathname);

    next();
  });

  onDestroy(beforeRouteEnterCallback);
  onDestroy(afterRouteEnterCallback);
</script>

<h1>Welcome to Routve!</h1>

<br />

<Navigator />

<br />
<br />

<Router routerConfig="{RouterConfig}" />
