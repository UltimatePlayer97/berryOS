<script lang="ts">
  import Icon from "@iconify/svelte";
  import { desktopSettings } from "$lib/state.svelte";

  type AppId = "welcome" | "notes" | "settings";

  type WindowState = {
    open: boolean;
    minimized: boolean;
    focused: boolean;
  };

  type AppMeta = {
    id: AppId;
    icon: string;
    label: string;
  };

  type Props = {
    windows: Record<AppId, WindowState>;
    appRegistry: AppMeta[];
    toggleApp: (app: AppId) => void;
  };

  let { windows, appRegistry, toggleApp }: Props = $props();
</script>

<div
  class="group/dock fixed bottom-0 left-0 w-full z-9999 h-16 flex justify-center items-end pb-2 transition-transform duration-300 ease-out
    {desktopSettings.autohide
    ? 'translate-y-11 hover:translate-y-0'
    : 'translate-y-0'}"
>
  <div
    class="flex items-end gap-3 bg-white/10 backdrop-blur-xl px-3 py-2 rounded-[20px] border border-white/20 transition-all duration-300
      {desktopSettings.autohide
      ? 'opacity-40 group-hover/dock:opacity-100'
      : 'opacity-100'}"
  >
    {#each appRegistry as app}
      <button
        class="relative w-14 h-14 flex items-center justify-center bg-black/20 rounded-xl hover:scale-110 transition"
        onclick={() => toggleApp(app.id)}
      >
        <Icon icon={app.icon} class="w-7 h-7 text-white/90" />

        {#if windows[app.id].open}
          <span class="absolute -bottom-1 w-1.5 h-1.5 bg-pink-400 rounded-full"
          ></span>
        {/if}
      </button>
    {/each}
  </div>
</div>
