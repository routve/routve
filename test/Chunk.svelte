<script>
  import Loadable from "svelte-loadable";

  export let dynamicImport;
  export let delay = 0;
  export let params = {};
</script>

<Loadable loader="{dynamicImport}" delay="{delay}">
  <div slot="loading"></div>

  <div slot="success" let:component>
    <svelte:component this="{component}" {...params} />
    <br />
    Test
  </div>
</Loadable>
