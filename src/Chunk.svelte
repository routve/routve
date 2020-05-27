<script>
  import Loadable from "svelte-loadable";
  import {
    isPageLoading,
    isRouteLoading,
    isComponentLoading,
  } from "./RouterStore";

  export let component;
  export let dynamicImport;
  export let delay = 0;
  export let params = {};

  function onLoad() {
    isComponentLoading.set(true);
  }

  function onSuccess() {
    isComponentLoading.set(false);

    if (!isRouteLoading) isPageLoading.set(false);
  }
</script>

{component ? '' : ''} // suppress unused component export
<Loadable loader="{dynamicImport}" delay="{delay}">
  <div slot="loading">{onLoad() ? '' : ''}</div>

  <div slot="success" let:component>
    <svelte:component this="{component}" {...params} />
    {onSuccess() ? '' : ''}
  </div>
</Loadable>
