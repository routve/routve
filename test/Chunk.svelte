<script>
  import Loadable from "svelte-loadable";

  export let component;
  export let dynamicImport;
  export let delay = 0;
  export let params = {};
</script>

<!--suppress JSUnusedAssignment, BadExpressionStatementJS, ES6UnusedImports -->
<Loadable loader="{dynamicImport}" delay="delay">
  <div slot="loading"></div>

  <div slot="success" let:component>
    <svelte:component this="{component}" {...params} />
    Test
  </div>
</Loadable>
