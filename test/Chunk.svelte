<script>
  import Loadable from "svelte-loadable";
  import { get } from "svelte/store";
  import { onMount } from "svelte";

  import {
    isPageLoading,
    isRouteLoading,
    isComponentLoading,
  } from "../src/RouterStore";

  export let component;
  export let delay = 0;
  export let params = {};

  let isStatic = false;
  let onMounted = false;

  function setPageLoaded() {
    isComponentLoading.set(false);

    if (!get(isRouteLoading)) isPageLoading.set(false);
  }

  onMount(() => {
    if (isStatic) setPageLoaded();
    onMounted = true;
  });

  $: {
    try {
      component();
    } catch (e) {
      isStatic = e.toString().includes("new");
    }

    params;

    if (isStatic && onMounted) setPageLoaded();
  }
</script>

{#if isStatic}
  <svelte:component this="{component}" {...params} />
{:else}
  <Loadable loader="{component}" delay="{delay}">
    <div slot="success" let:component>
      <svelte:component this="{component}" {...params} />
      {setPageLoaded() ? '' : ''}
      <br />
      Test chunk
    </div>
  </Loadable>
{/if}
