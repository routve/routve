<script context="module">
  import { writable } from "svelte/store";

  const instanceCount = writable(0);
</script>

<script>
  import { onDestroy } from "svelte";
  export let type;

  instanceCount.update((value) => {
    value++;

    return value;
  });
</script>

<br />
{type}
<br />
Count:
{$instanceCount}
