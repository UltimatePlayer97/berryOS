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
    class="flex h-110 overflow-hidden text-(--app-text) select-none rounded-b-xl -m-6 bg-transparent transition-colors duration-200"
  >
    <div
      class="w-48 bg-black/3 dark:bg-black/20 p-3 border-r border-(--app-border) flex flex-col gap-1"
    >
      <button
        onclick={() => (currentTab = "general")}
        class="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all font-medium border-0 cursor-pointer bg-transparent {currentTab ===
        'general'
          ? 'bg-black/5 dark:bg-white/15 shadow-sm text-(--app-text)'
          : 'opacity-60 hover:opacity-100 hover:bg-black/2 dark:hover:bg-white/5'}"
      >
        <Icon icon="mdi:cog" class="w-4 h-4 text-primary" />
        <span class="text-sm">General</span>
      </button>

      <button
        onclick={() => (currentTab = "sound")}
        class="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all font-medium border-0 cursor-pointer bg-transparent {currentTab ===
        'sound'
          ? 'bg-black/5 dark:bg-white/15 shadow-sm text-(--app-text)'
          : 'opacity-60 hover:opacity-100 hover:bg-black/2 dark:hover:bg-white/5'}"
      >
        <Icon icon="mdi:volume-high" class="w-4 h-4 text-primary" />
        <span class="text-sm">Sound & Audio</span>
      </button>
    </div>

    <div class="flex-1 p-6 overflow-y-auto">
      {#if currentTab === "general"}
        <h2 class="text-xl font-bold mb-4 border-b border-(--app-border) pb-2">
          General Options
        </h2>

        <div class="flex flex-col gap-3 mt-4">
          <div
            class="flex items-center justify-between bg-black/2 dark:bg-black/20 light:bg-black/4 rounded-xl border border-(--app-border) p-4"
          >
            <div class="flex items-center gap-3">
              <Icon icon="mdi:dock-bottom" class="w-5 h-5 text-primary" />
              <div>
                <p class="text-sm font-semibold">Autohide Desktop Dock</p>
                <p class="text-xs opacity-60 mt-0.5">
                  Hide the dock unless hovering over screen edge
                </p>
              </div>
            </div>
            <Switch
              bind:checked={desktopSettings.autohide}
              id="autohide-toggle"
            />
          </div>

          <div
            class="flex items-center justify-between bg-black/2 dark:bg-black/20 light:bg-black/4 rounded-xl border border-(--app-border) p-4"
          >
            <div class="flex items-center gap-3">
              <Icon icon="mdi:palette" class="w-5 h-5 text-primary" />
              <div>
                <p class="text-sm font-semibold">Appearance</p>
                <p class="text-xs opacity-60 mt-0.5">
                  Switch between light and dark system themes
                </p>
              </div>
            </div>

            <div class="relative w-36">
              <select
                bind:value={desktopSettings.theme}
                class="w-full bg-white/80 dark:bg-black/40 px-3 py-2 rounded-lg border border-(--app-border) outline-none text-xs appearance-none cursor-pointer font-medium text-(--app-text)"
              >
                <option value="dark" class="bg-(--app-bg) text-(--app-text)"
                  >🌙 Dark</option
                >
                <option value="light" class="bg-(--app-bg) text-(--app-text)"
                  >☀️ Light</option
                >
              </select>
              <div
                class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50"
              >
                <Icon icon="mdi:chevron-down" class="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      {:else if currentTab === "sound"}
        <h2 class="text-xl font-bold mb-4 border-b border-(--app-border) pb-2">
          Sound & Audio
        </h2>

        <div
          class="flex flex-col gap-6 mt-4 bg-black/2 dark:bg-black/20 light:bg-black/[0.04] rounded-xl border border-(--app-border) p-4"
        >
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-sm font-semibold flex items-center gap-2">
                <Icon icon="mdi:volume-high" class="w-4 h-4 text-primary" />
                Output Volume
              </span>
              <span class="text-xs font-mono opacity-60"
                >{systemVolume[0]}%</span
              >
            </div>
            <Slider
              type="single"
              bind:value={systemVolume[0]}
              max={100}
              step={1}
              class="max-w-full"
            />
          </div>
        </div>
      {/if}
    </div>
  </div>
</Window>
