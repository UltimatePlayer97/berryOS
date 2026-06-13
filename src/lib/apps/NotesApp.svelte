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

<Window title="Hacker Notes" {isOpen} {onClose}>
  <div class="text-(--app-text) select-none transition-colors duration-200">
    <h1 class="text-2xl font-bold border-b border-(--app-border) pb-2 w-full">
      Notes
    </h1>

    <div class="flex flex-col gap-4 mt-4">
      <p class="text-sm opacity-75">
        Welcome to your workspace notes built with SvelteKit, Bun, and
        TailwindCSS!
      </p>

      <textarea
        placeholder="Type some scratchpad logs here..."
        class="w-full h-40 bg-black/2 dark:bg-black/20 light:bg-[#f2f4f8] text-(--app-text) placeholder:opacity-40 border border-(--app-border) rounded-xl p-4 outline-none focus:border-primary transition-all resize-none text-sm font-medium"
      ></textarea>
    </div>
  </div>
</Window>
