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
  <div class="flex flex-col items-center">
    <img
      src="{base}/assets/star.png"
      alt="Star"
      class="w-25 h-25 object-cover rounded-full border-3 border-[#f5c2e7] mt-2"
    />
    <h1
      class="text-[#f5c2e7] text-3xl font-bold border-b-2 border-[#f5c2e7] pb-2 w-full text-center mt-2"
    >
      Welcome to berryOS
    </h1>
  </div>
  <hr class="border-0 border-t border-[#45475a] my-5" />
  <h2 class="text-[#f5c2e7] text-xl font-bold">
    User Profile: Developer & Gamer
  </h2>
  <p class="mt-2 text-white/80">
    <strong>Core Languages:</strong> Go, C#, and C++
  </p>
</Window>
