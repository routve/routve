<script>
  import Loadable from "svelte-loadable";
  import { get } from "svelte/store";
  import { onMount } from "svelte";

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

  try {
    component();
  } catch (e) {
    if (e.toString().includes("new")) isStatic = true;
  }

  function setPageLoaded() {
    isComponentLoading.set(false);

    if (!get(isRouteLoading)) isPageLoading.set(false);
  }

  onMount(() => {
    setPageLoaded();
    onMounted = true;
  });

  $: {
    component
    params

    if (onMounted) setPageLoaded();
  }
</script>

{#if isStatic}
  <svelte:component this="{component}" {...params} />
{:else}
  <Loadable loader="{component}" delay="{delay}">
    <div slot="success" let:component>
      <svelte:component this="{component}" {...params} />
    </div>
  </Loadable>
{/if}
