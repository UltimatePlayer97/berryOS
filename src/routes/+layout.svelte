<script lang="ts">
  import "./layout.css";
  import { desktopSettings } from "$lib/state.svelte.js";

  let { children } = $props();
</script>

<svelte:head></svelte:head>

<div
  class="{desktopSettings.theme} w-screen min-h-screen h-screen overflow-hidden transition-all duration-300"
>
  {@render children?.()}
</div>
