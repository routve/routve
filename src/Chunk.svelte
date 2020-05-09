<script>
  import Loadable from "svelte-loadable";
  import { isPageLoading } from "./RouterStore";

  export let component;
  export let dynamicImport;
  export let delay = 0;
  export let params = {};
</script>

<!--suppress JSUnusedAssignment, BadExpressionStatementJS, ES6UnusedImports -->
<Loadable loader="{dynamicImport}" delay="delay">
  <div slot="loading">{isPageLoading.set(true) ? '' : ''}</div>

  <div slot="success" let:component>
    <svelte:component this="{component}" {...params} />
    {isPageLoading.set(false) ? '' : ''}
  </div>
</Loadable>
