<script lang="ts">
  import "./layout.css";
  import { base } from "$app/paths";

  let { children } = $props();
</script>

{@render children?.()}

<svelte:head></svelte:head>
{@render children()}
