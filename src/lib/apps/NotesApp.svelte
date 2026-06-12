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
  <h1
    class="text-[#f5c2e7] text-3xl font-bold border-b-2 border-[#f5c2e7] pb-2 w-full"
  >
    Notes
  </h1>
  <hr class="border-0 border-t border-[#45475a] my-5" />
  <div class="flex flex-col gap-3 text-white/80">
    <p>
      Welcome to your workspace notes built with SvelteKit, Bun, and
      TailwindCSS!
    </p>
    <textarea
      placeholder="Type some scratchpad logs here..."
      class="w-full h-40 bg-black/20 border border-[#45475a] rounded-xl p-3 text-[#cdd6f4] outline-none focus:border-[#f5c2e7] transition-colors resize-none"
    ></textarea>
  </div>
</Window>
