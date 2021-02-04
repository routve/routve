<script>
  import Loadable from "svelte-loadable";
  import { get } from "svelte/store";
  import { onMount, setContext } from "svelte";

  import { isClass } from "./util";

  import {
    isPageLoading,
    isRouteLoading,
    isComponentLoading,
  } from "./RouterStore";

  export let component;
  export let delay = 0;
  export let params = {};
  export let subRouterContext = null;

  let isStatic = false;
  let onMounted = false;
  let isLoadableLoaded = false;
  let isPromiseLoaded = false;

  let isPromise;

  function setPageLoaded() {
    isComponentLoading.set(false);

    if (!get(isRouteLoading)) isPageLoading.set(false);
  }

  function setLoadableLoaded() {
    setPageLoaded();
    isLoadableLoaded = true;
  }

  function setPromiseLoaded() {
    setPageLoaded();
    isPromiseLoaded = true;
  }

  onMount(() => {
    if (isStatic) setPageLoaded();
    onMounted = true;
  });

  $: isPromise = component instanceof Promise;
  $: isStatic = isClass(component);
  $: {
    if (typeof subRouterContext !== "undefined")
      setContext("routve.context", subRouterContext);
  }

  $: {
    component;
    params;

    if (
      (isPromise && isPromiseLoaded) ||
      (isStatic && onMounted) ||
      (!isStatic && !isPromise && isLoadableLoaded)
    )
      setPageLoaded();
  }
</script>

{#if isPromise}
  {#await component.then(({ default: C }) => C) then component}
    <svelte:component this="{component}" {...params} />
    {setPromiseLoaded() ? "" : ""}
  {/await}
{:else if isStatic}
  <svelte:component this="{component}" {...params} />
{:else}
  <Loadable loader="{component}" delay="{delay}">
    <div slot="success" let:component>
      <svelte:component this="{component}" {...params} />
      {setLoadableLoaded() ? "" : ""}
    </div>
  </Loadable>
{/if}
