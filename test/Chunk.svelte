<script>
  import Loadable from "svelte-loadable";
  import { get } from "svelte/store";
  import { onMount, setContext } from "svelte";

  import { isClass } from "../src/util";

  import {
    isPageLoading,
    isRouteLoading,
    isComponentLoading,
  } from "../src/RouterStore";

  export let component;
  export let delay = 0;
  export let params = {};
  export let subRoutes = null;
  export let subBasePath = null;

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
    if (typeof subRoutes !== "undefined") setContext("route", subRoutes);
  }
  $: {
    if (typeof subBasePath !== "undefined") setContext("basePath", subBasePath);
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
    {setPromiseLoaded() ? '' : ''}
  {/await}
{:else if isStatic}
  <svelte:component this="{component}" {...params} />
{:else}
  <Loadable loader="{component}" delay="{delay}">
    <div slot="success" let:component>
      <svelte:component this="{component}" {...params} />
      {setLoadableLoaded() ? '' : ''}
      <br />
      Test chunk
    </div>
  </Loadable>
{/if}
