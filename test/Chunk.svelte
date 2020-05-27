<script>
  import Loadable from "svelte-loadable";

  export let component;
  export let dynamicImport;
  export let delay = 0;
  export let params = {};
</script>

<!--suppress unused component export-->
{component ? '' : ''}
<Loadable loader="{dynamicImport}" delay="{delay}">
  <div slot="loading"></div>

  <div slot="success" let:component>
    <svelte:component this="{component}" {...params} />
    <br />
    Test
  </div>
</Loadable>
