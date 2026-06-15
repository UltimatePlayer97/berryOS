<script lang="ts">
  import Window from "$lib/components/Window.svelte";
  import { Switch } from "$lib/components/ui/switch";
  import Icon from "@iconify/svelte";
  import { desktopSettings } from "$lib/state.svelte";

  let {
    isOpen = false,
    onClose = () => {},
  }: { isOpen: boolean; onClose: () => void } = $props();
  let currentTab = $state("general");

  function handleWallpaperUpload(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          desktopSettings.customWallpaper = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  function clearWallpaper() {
    desktopSettings.customWallpaper = null;
  }
</script>

<Window title="System Settings" {isOpen} {onClose}>
  <div
    class="flex h-120 overflow-hidden text-(--app-text) select-none rounded-b-xl -m-6 bg-transparent transition-colors duration-200"
  >
    <div
      class="w-48 bg-black/5 dark:bg-black/20 p-3 border-r border-(--app-border) flex flex-col gap-1"
    >
      <button
        onclick={() => (currentTab = "general")}
        class="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all font-medium border-0 cursor-pointer bg-transparent
          {currentTab === 'general'
          ? 'bg-black/5 dark:bg-white/15 shadow-sm font-semibold'
          : 'opacity-60 hover:opacity-100 hover:bg-black/2 dark:hover:bg-white/5'}"
      >
        <Icon
          icon="mdi:cog"
          class="w-4 h-4 transition-colors"
          style="color: {desktopSettings.accentColor || '#ea76cb'}"
        />
        <span class="text-sm">General</span>
      </button>

      <button
        onclick={() => (currentTab = "personalization")}
        class="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all font-medium border-0 cursor-pointer bg-transparent
          {currentTab === 'personalization'
          ? 'bg-black/5 dark:bg-white/15 shadow-sm font-semibold'
          : 'opacity-60 hover:opacity-100 hover:bg-black/2 dark:hover:bg-white/5'}"
      >
        <Icon
          icon="mdi:palette"
          class="w-4 h-4 transition-colors"
          style="color: {desktopSettings.accentColor || '#ea76cb'}"
        />
        <span class="text-sm">Personalization</span>
      </button>
    </div>

    <div
      class="flex-1 p-6 overflow-y-auto bg-neutral-900/10 dark:bg-neutral-900/40"
    >
      {#if currentTab === "general"}
        <h2 class="text-xl font-bold mb-4 border-b border-(--app-border) pb-2">
          General Options
        </h2>
        <div class="flex flex-col gap-3 mt-4"></div>
      {/if}

      {#if currentTab === "personalization"}
        <h2 class="text-xl font-bold mb-4 border-b border-(--app-border) pb-2">
          Personalization Settings
        </h2>

        <div class="mb-6 flex flex-col gap-2">
          <p class="text-sm font-semibold opacity-80">
            Desktop Background Preview
          </p>
          <div
            class="relative w-full aspect-video rounded-xl border border-white/10 overflow-hidden shadow-inner bg-black/40 flex items-center justify-center"
          >
            {#if desktopSettings.customWallpaper}
              <img
                src={desktopSettings.customWallpaper}
                alt="Wallpaper preview"
                class="w-full h-full object-cover"
              />
            {:else}
              <div
                class="w-full h-full transition-all duration-300"
                style="background: linear-gradient(135deg, #11111b 0%, {desktopSettings.accentColor ||
                  '#ea76cb'} 100%);"
              ></div>
            {/if}
            <div
              class="absolute top-0 left-0 w-full h-2.5 bg-black/20 backdrop-blur-xs flex justify-between px-1.5 items-center text-[5px] text-white/60"
            >
              <span>berryOS</span>
              <span>12:00 PM</span>
            </div>
            <div
              class="absolute bottom-1 w-1/3 h-2 rounded-xs transition-colors"
              style="background-color: {desktopSettings.accentColor ||
                '#ea76cb'}; opacity: 0.6;"
            ></div>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <div
            class="flex flex-col gap-4 bg-black/2 dark:bg-black/20 rounded-xl border border-(--app-border) p-4"
          >
            <div class="flex flex-col gap-1">
              <p class="text-sm font-semibold">System Accent Color</p>
              <p class="text-xs opacity-60">
                Choose a primary highlight tone for workspace elements
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-3 mt-1">
              {#each ["#ea76cb", "#38bdf8", "#4ade80", "#fbbf24", "#f472b6", "#a78bfa"] as color}
                <button
                  type="button"
                  onclick={() => (desktopSettings.accentColor = color)}
                  class="w-7 h-7 rounded-full border-2 transition cursor-pointer hover:scale-110 active:scale-95"
                  style="background-color: {color}; border-color: {desktopSettings.accentColor ===
                  color
                    ? '#ffffff'
                    : 'transparent'}; box-shadow: {desktopSettings.accentColor ===
                  color
                    ? '0 0 0 1px rgba(0,0,0,0.3)'
                    : 'none'};"
                  aria-label="Select accent {color}"
                ></button>
              {/each}

              <div class="w-px h-6 bg-(--app-border) mx-1"></div>

              <div class="flex items-center gap-2">
                <label
                  class="relative w-8 h-8 rounded-xl border border-white/20 flex items-center justify-center cursor-pointer overflow-hidden bg-black/10 hover:bg-black/20 transition-all active:scale-95"
                  style="background-color: {desktopSettings.accentColor ||
                    '#ea76cb'}"
                >
                  <Icon
                    icon="mdi:color-picker"
                    class="w-4 h-4 z-10 pointer-events-none drop-shadow-sm"
                    style="color: {desktopSettings.accentColor === '#ffffff'
                      ? '#11111b'
                      : '#ffffff'}"
                  />

                  <input
                    type="color"
                    value={desktopSettings.accentColor || "#ea76cb"}
                    oninput={(e) => {
                      const target = e.target as HTMLInputElement;
                      desktopSettings.accentColor = target.value;
                    }}
                    class="absolute inset-0 opacity-0 w-full h-full cursor-pointer scale-150"
                  />
                </label>

                <span
                  class="text-xs font-mono opacity-70 uppercase tracking-wider"
                >
                  {desktopSettings.accentColor || "#ea76cb"}
                </span>
              </div>
            </div>
          </div>

          <div
            class="flex flex-col gap-3 bg-black/2 dark:bg-black/20 rounded-xl border border-(--app-border) p-4"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <Icon
                  icon="mdi:image-plus"
                  class="w-5 h-5 transition-colors"
                  style="color: {desktopSettings.accentColor || '#ea76cb'}"
                />
                <div>
                  <p class="text-sm font-semibold">Custom Background Image</p>
                  <p class="text-xs opacity-60 mt-0.5">
                    Upload an image file (.jpg, .png, .webp)
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-2">
                {#if desktopSettings.customWallpaper}
                  <button
                    onclick={clearWallpaper}
                    class="px-3 py-1.5 text-xs font-semibold text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 bg-transparent rounded-lg cursor-pointer transition"
                  >
                    Remove
                  </button>
                {/if}
                <label
                  class="px-3 py-1.5 text-xs font-semibold text-white rounded-lg cursor-pointer transition shadow-sm hover:brightness-110"
                  style="background-color: {desktopSettings.accentColor ||
                    '#ea76cb'}"
                >
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    class="hidden"
                    onchange={handleWallpaperUpload}
                  />
                </label>
              </div>
            </div>
          </div>

          <div
            class="flex items-center justify-between bg-black/2 dark:bg-black/20 rounded-xl border border-(--app-border) p-4"
          >
            <div class="flex items-center gap-3">
              <Icon
                icon="mdi:theme-light-dark"
                class="w-5 h-5 transition-colors"
                style="color: {desktopSettings.accentColor || '#ea76cb'}"
              />
              <div>
                <p class="text-sm font-semibold">System Color Theme</p>
                <p class="text-xs opacity-60 mt-0.5">
                  Switch between dark and light system profiles
                </p>
              </div>
            </div>
            <select
              bind:value={desktopSettings.theme}
              class="bg-white/80 dark:bg-black/40 px-3 py-1.5 rounded-lg border border-(--app-border) outline-none text-xs text-(--app-text) cursor-pointer"
            >
              <option value="dark">🌙 Dark</option>
              <option value="light">☀️ Light</option>
            </select>
          </div>

          <div
            class="flex items-center justify-between bg-black/2 dark:bg-black/20 rounded-xl border border-(--app-border) p-4"
          >
            <div class="flex items-center gap-3">
              <Icon
                icon="mdi:dock-bottom"
                class="w-5 h-5 transition-colors"
                style="color: {desktopSettings.accentColor || '#ea76cb'}"
              />
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
        </div>
      {/if}
    </div>
  </div>
</Window>
