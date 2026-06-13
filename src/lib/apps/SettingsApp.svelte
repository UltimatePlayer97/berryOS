<script>
  import Window from "$lib/components/Window.svelte";
  import { Switch } from "$lib/components/ui/switch";
  import { Slider } from "$lib/components/ui/slider";
  import Icon from "@iconify/svelte";

  import { desktopSettings } from "$lib/state.svelte";

  /**
   * @typedef {object} AppProps
   * @property {boolean} [isOpen]
   * @property {() => void} [onClose]
   */

  /** @type {AppProps} */
  let { isOpen = false, onClose = () => {} } = $props();

  let systemVolume = $state([75]);
  let currentTab = $state("general");
</script>

<Window title="System Settings" {isOpen} {onClose}>
  <div
    class="flex h-100 overflow-hidden text-[#cdd6f4] select-none rounded-b-xl -m-6 bg-[#1e1e2e]/90 backdrop-blur-md"
  >
    <div
      class="w-48 bg-black/20 p-3 border-r border-[#45475a] flex flex-col gap-1"
    >
      <button
        onclick={() => (currentTab = "general")}
        class="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors font-medium border-0 cursor-pointer bg-transparent {currentTab ===
        'general'
          ? 'bg-white/10 text-white'
          : 'text-[#a6adc8] hover:bg-white/5 hover:text-white'}"
      >
        <Icon icon="mdi:cog" class="w-4 h-4 text-[#f5c2e7]" />
        <span class="text-sm">General</span>
      </button>

      <button
        onclick={() => (currentTab = "sound")}
        class="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors font-medium border-0 cursor-pointer bg-transparent {currentTab ===
        'sound'
          ? 'bg-white/10 text-white'
          : 'text-[#a6adc8] hover:bg-white/5 hover:text-white'}"
      >
        <Icon icon="mdi:volume-high" class="w-4 h-4 text-[#f5c2e7]" />
        <span class="text-sm">Sound & Audio</span>
      </button>
    </div>

    <div class="flex-1 p-6 overflow-y-auto">
      {#if currentTab === "general"}
        <h2
          class="text-xl font-bold mb-4 text-[#f5c2e7] border-b border-[#45475a] pb-2"
        >
          General Options
        </h2>

        <div class="flex flex-col gap-3 mt-4">
          <div
            class="flex items-center justify-between bg-black/20 rounded-xl border border-[#45475a] p-4 transition-all hover:bg-black/20"
          >
            <div class="flex items-center gap-3">
              <Icon icon="mdi:dock-bottom" class="w-5 h-5 text-[#f5c2e7]" />
              <div>
                <p class="text-sm font-medium text-white">
                  Autohide Desktop Dock
                </p>
                <p class="text-xs text-[#a6adc8] mt-0.5">
                  Automatically hide the dock unless hovering over screen edge
                </p>
              </div>
            </div>
            <Switch
              bind:checked={desktopSettings.autohide}
              id="autohide-toggle"
            />
          </div>
        </div>
      {:else if currentTab === "sound"}
        <h2
          class="text-xl font-bold mb-4 text-[#f5c2e7] border-b border-[#45475a] pb-2"
        >
          Sound & Audio
        </h2>

        <div
          class="flex flex-col gap-6 mt-4 bg-black/20 rounded-xl border border-[#45475a] p-4"
        >
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span
                class="text-sm font-medium text-white flex items-center gap-2"
              >
                <Icon icon="mdi:volume-high" class="w-4 h-4 text-[#f5c2e7]" /> Output
                Volume
              </span>
              <span class="text-xs text-[#a6adc8] font-mono"
                >{systemVolume[0]}%</span
              >
            </div>
            <Slider
              type="single"
              value={systemVolume[0]}
              max={100}
              step={1}
              class="max-w-[70%]"
            />
          </div>
        </div>
      {/if}
    </div>
  </div>
</Window>
