<script>
  import Loadable from "svelte-loadable";
  import { get } from "svelte/store";

  import {
    isPageLoading,
    isRouteLoading,
    isComponentLoading,
  } from "./RouterStore";

  export let dynamicImport;
  export let delay = 0;
  export let params = {};

  function onSuccess() {
    isComponentLoading.set(false);

    if (!get(isRouteLoading)) isPageLoading.set(false);
  }
</script>

<Loadable loader="{dynamicImport}" delay="{delay}">
  <div slot="success" let:component>
    <svelte:component this="{component}" {...params} />
    {onSuccess() ? '' : ''}
  </div>
</Loadable>
