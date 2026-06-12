<script lang="ts">
  import "./layout.css";
  import { base } from "$app/paths";

  let { children } = $props();
</script>

<div
  class="w-screen h-screen overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
  style="background-image: url('{base}/assets/background.jpg');"
>
  {@render children?.()}
</div>

<svelte:head></svelte:head>
{@render children()}
