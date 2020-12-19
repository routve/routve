<script>
  import Router, {
    beforeRouteEnter,
    afterRouteEnter,
    // getPath,
    path,
    isPageLoading,
    routeName,
  } from "../../../src";
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

  const isPageLoadingReadable = isPageLoading.subscribe((value) => {
    // console.log(value);
  });

  const unsubscribeRouteName = routeName.subscribe((name) =>
    console.log("Route name: " + name)
  );

  onDestroy(beforeRouteEnterCallback);
  onDestroy(afterRouteEnterCallback);
  onDestroy(isPageLoadingReadable);
  onDestroy(unsubscribeRouteName);
</script>

<h1>Welcome to Routve! Current route: {$path}</h1>

<br />

<Navigator />

<br />
<br />

{#if $isPageLoading}Loading: {$isPageLoading}{/if}

<Router config="{RouterConfig}" hidden="{$isPageLoading}" />
