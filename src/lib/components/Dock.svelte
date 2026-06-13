<script>
  import Icon from "@iconify/svelte";
  import { desktopSettings } from "$lib/state.svelte";

  /**
   * @typedef {object} DockProps
   * @property {{ welcome: boolean; notes: boolean; settings: boolean; [key: string]: boolean }} apps
   * @property {(appName: string) => void} toggleApp
   * @property {(e: KeyboardEvent, appName: string) => void} handleKeyDown
   */

  /** @type {DockProps} */
  let { apps, toggleApp, handleKeyDown } = $props();
</script>

<div
  class="group/dock fixed bottom-0 left-0 w-full h-16 flex justify-center items-end pb-2 pointer-events-auto z-2000"
>
  <div
    class="flex items-end gap-3 bg-white/10 backdrop-blur-xl px-3 py-2 rounded-[20px] border border-white/20 shadow-2xl transition-all duration-200 ease-out
    {desktopSettings.autohide
      ? 'opacity-0 translate-y-4 pointer-events-none group-hover/dock:opacity-100 group-hover/dock:translate-y-0 group-hover/dock:pointer-events-auto'
      : ''}"
  >
    <div
      role="button"
      tabindex="0"
      class="group relative cursor-pointer pb-1.5 transition-transform duration-200 ease-out hover:scale-115 hover:-translate-y-1.5 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#f5c2e7] after:rounded-full after:opacity-0 after:transition-all outline-none {apps.welcome
        ? 'after:opacity-100 after:shadow-[0_0_6px_2px_#f5c2e7]'
        : ''}"
      onclick={() => toggleApp("welcome")}
      onkeydown={(e) => handleKeyDown(e, "welcome")}
    >
      <div
        class="w-12 h-12 flex items-center justify-center bg-black/20 rounded-xl transition-all {apps.welcome
          ? 'shadow-[0_0_12px_rgba(245,194,231,0.6)]'
          : ''}"
      >
        <Icon icon="mdi:monitor-dashboard" class="w-7 h-7 text-white/90" />
      </div>
      <span
        class="absolute -top-10 left-1/2 -translate-x-1/2 scale-80 bg-black/75 text-white px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-all group-hover:opacity-100 group-hover:scale-100"
        >Welcome</span
      >
    </div>

    <div
      role="button"
      tabindex="0"
      class="group relative cursor-pointer pb-1.5 transition-transform duration-200 ease-out hover:scale-115 hover:-translate-y-1.5 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#f5c2e7] after:rounded-full after:opacity-0 after:transition-all outline-none {apps.notes
        ? 'after:opacity-100 after:shadow-[0_0_6px_2px_#f5c2e7]'
        : ''}"
      onclick={() => toggleApp("notes")}
      onkeydown={(e) => handleKeyDown(e, "notes")}
    >
      <div
        class="w-12 h-12 flex items-center justify-center bg-black/20 rounded-xl transition-all {apps.notes
          ? 'shadow-[0_0_12px_rgba(245,194,231,0.6)]'
          : ''}"
      >
        <Icon icon="mdi:note-text-outline" class="w-7 h-7 text-white/90" />
      </div>
      <span
        class="absolute -top-10 left-1/2 -translate-x-1/2 scale-80 bg-black/75 text-white px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-all group-hover:opacity-100 group-hover:scale-100"
        >Notes</span
      >
    </div>

    <div
      role="button"
      tabindex="0"
      class="group relative cursor-pointer pb-1.5 transition-transform duration-200 ease-out hover:scale-115 hover:-translate-y-1.5 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#f5c2e7] after:rounded-full after:opacity-0 after:transition-all outline-none {apps.settings
        ? 'after:opacity-100 after:shadow-[0_0_6px_2px_#f5c2e7]'
        : ''}"
      onclick={() => toggleApp("settings")}
      onkeydown={(e) => handleKeyDown(e, "settings")}
    >
      <div
        class="w-12 h-12 flex items-center justify-center bg-black/20 rounded-xl transition-all {apps.settings
          ? 'shadow-[0_0_12px_rgba(245,194,231,0.6)]'
          : ''}"
      >
        <Icon icon="mdi:cog" class="w-7 h-7 text-white/90" />
      </div>
      <span
        class="absolute -top-10 left-1/2 -translate-x-1/2 scale-80 bg-black/75 text-white px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-all group-hover:opacity-100 group-hover:scale-100"
        >System Settings</span
      >
    </div>
  </div>
</div>
