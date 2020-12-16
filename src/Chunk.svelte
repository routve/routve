<script>
  import Loadable from "svelte-loadable";
  import { get } from "svelte/store";
  import { onMount } from "svelte";

  import { isClass } from "./util";

  import {
    isPageLoading,
    isRouteLoading,
    isComponentLoading,
  } from "./RouterStore";

  export let component;
  export let delay = 0;
  export let params = {};

  let isStatic = false;
  let onMounted = false;
  let isLoadableLoaded = false;

  function setPageLoaded() {
    isComponentLoading.set(false);

    if (!get(isRouteLoading)) isPageLoading.set(false);
  }

  function setLoadableLoaded() {
    setPageLoaded();
    isLoadableLoaded = true;
  }

  onMount(() => {
    if (isStatic) setPageLoaded();
    onMounted = true;
  });

  $: isStatic = isClass(component);

  $: {
    component;
    params;

    if ((isStatic && onMounted) || (!isStatic && isLoadableLoaded))
      setPageLoaded();
  }
</script>

{#if isStatic}
  <svelte:component this="{component}" {...params} />
{:else}
  <Loadable loader="{component}" delay="{delay}">
    <div slot="success" let:component>
      <svelte:component this="{component}" {...params} />
      {setLoadableLoaded() ? '' : ''}
    </div>
  </Loadable>
{/if}
