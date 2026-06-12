<script>
  import Window from "$lib/components/Window.svelte";

  /**
   * @typedef {object} AppProps
   * @property {boolean} [isOpen]
   * @property {() => void} [onClose]
   */

  /** @type {AppProps} */
  let { isOpen = false, onClose = () => {} } = $props();
</script>

<Window title="System Settings" {isOpen} {onClose}>
  <div class="flex flex-col items-center">
    <h1
      class="text-[#f5c2e7] text-3xl font-bold border-b-2 border-[#f5c2e7] pb-2 w-full text-center mt-2"
    >
      System Settings
    </h1>
  </div>
  <hr class="border-0 border-t border-[#45475a] my-5" />
  <h2 class="text-[#f5c2e7] text-xl font-bold">General Options</h2>
  <p class="mt-2 text-white/80">
    <strong>Dock Behavior:</strong> Autohide is currently forced by system default.
  </p>
</Window>
