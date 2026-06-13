<script>
  import Window from "$lib/components/Window.svelte";
  import { base } from "$app/paths";

  /**
   * @typedef {object} AppProps
   * @property {boolean} [isOpen]
   * @property {() => void} [onClose]
   */

  /** @type {AppProps} */
  let { isOpen = false, onClose = () => {} } = $props();
</script>

<Window title="Welcome to berryOS" {isOpen} {onClose}>
  <div
    class="os-window h-full w-full p-4 rounded-b-xl transition-colors duration-200"
  >
    <div class="flex flex-col items-center">
      <img
        src="{base}/assets/star.png"
        alt="Star"
        class="w-25 h-25 object-cover rounded-full border-3 border-(--app-border) mt-2"
      />
      <h1
        class="text-(--app-text) text-3xl font-bold border-b-2 border-(--app-border) pb-2 w-full text-center mt-2"
      >
        Welcome to berryOS
      </h1>
    </div>

    <hr class="border-0 border-t border-(--app-border) my-5" />

    <h2 class="text-(--app-text) text-xl font-bold opacity-90">
      User Profile: Developer & Gamer
    </h2>
    <p class="mt-2 text-(--app-text) opacity-75">
      <strong>Core Languages:</strong> Go, C#, and C++
    </p>
  </div>
</Window>
