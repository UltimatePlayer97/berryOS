<script lang="ts">
  import { onMount } from "svelte";
  import WelcomeApp from "$lib/apps/WelcomeApp.svelte";
  import NotesApp from "$lib/apps/NotesApp.svelte";
  import SettingsApp from "$lib/apps/SettingsApp.svelte";
  import Dock from "$lib/components/Dock.svelte";
  import AltTab from "$lib/components/AltTab.svelte";
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
    component: import("svelte").Component<any, any, any>;
  };

  const appRegistry: AppMeta[] = [
    {
      id: "welcome",
      icon: "mdi:monitor-dashboard",
      label: "Welcome",
      component: WelcomeApp,
    },
    {
      id: "notes",
      icon: "mdi:note-text-outline",
      label: "Notes",
      component: NotesApp,
    },
    {
      id: "settings",
      icon: "mdi:cog",
      label: "Settings",
      component: SettingsApp,
    },
  ];

  const appIds = appRegistry.map((a) => a.id);
  let currentTime = $state("");

  let windows = $state<Record<AppId, WindowState>>({
    welcome: { open: false, minimized: false, focused: false },
    notes: { open: false, minimized: false, focused: false },
    settings: { open: false, minimized: false, focused: false },
  });

  function focusApp(app: AppId) {
    for (const id of appIds) {
      windows[id].focused = id === app;
    }
  }

  function bringToFront(app: AppId) {
    const container = document.getElementById("window-surface");
    const el = container?.querySelector(`[data-app-name="${app}"]`);
    if (el && container) container.appendChild(el);
  }

  function openApp(app: AppId) {
    windows[app].open = true;
    windows[app].minimized = false;
    focusApp(app);
    setTimeout(() => bringToFront(app), 10);
  }

  function closeApp(app: AppId) {
    windows[app].open = false;
    windows[app].focused = false;
  }

  function toggleApp(app: AppId) {
    windows[app].open ? closeApp(app) : openApp(app);
  }

  onMount(() => {
    const updateTime = () => {
      const now = new Date();
      currentTime =
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }) +
        " · " +
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
    };

    const timer = setInterval(updateTime, 1000);
    updateTime();

    return () => clearInterval(timer);
  });
</script>

<div
  class="w-full h-full overflow-hidden relative {desktopSettings.theme}"
  style="--custom-accent: {desktopSettings.accentColor ||
    '#ea76cb'}; --color-primary: {desktopSettings.accentColor || '#ea76cb'};"
>
  {#if desktopSettings.customWallpaper}
    <div
      class="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-300"
      style="background-image: url({desktopSettings.customWallpaper})"
    ></div>
  {:else}
    <div
      class="absolute inset-0 z-0 transition-all duration-500 ease-in-out"
      style="background: {desktopSettings.theme === 'dark'
        ? `radial-gradient(circle at 50% 120%, ${desktopSettings.accentColor}25 0%, #11111b 100%)`
        : `radial-gradient(circle at 50% 120%, ${desktopSettings.accentColor}35 0%, #eff1f5 100%)`};"
    ></div>

    <div
      class="absolute inset-0 opacity-40 transition-all duration-500"
      style="background: radial-gradient(circle at top right, {desktopSettings.accentColor}20, transparent 45%); pointer-events: none;"
    ></div>
    <div
      class="absolute inset-0 opacity-20 transition-all duration-500"
      style="background: radial-gradient(circle at bottom left, {desktopSettings.accentColor}30, transparent 50%); pointer-events: none;"
    ></div>
  {/if}

  <div
    class="absolute top-0 left-0 w-full h-8 flex justify-between items-center px-4 backdrop-blur-xl bg-black/15 border-b border-white/5 text-white/90 z-999"
  >
    <div class="flex items-center gap-4">
      <div class="font-bold flex items-center gap-1">
        <Icon icon="mdi:fruit-citrus" class="w-4 h-4" />
        berryOS
      </div>
    </div>
    <div class="flex items-center gap-3.5">
      <p class="text-[13px] font-medium">{currentTime || "TIME"}</p>
    </div>
  </div>

  <div
    id="window-surface"
    class="absolute inset-0 top-8 bottom-16 z-10 pointer-events-none"
  >
    {#each appRegistry as app}
      {#if windows[app.id].open}
        <div
          data-app-name={app.id}
          class="absolute inset-0 pointer-events-auto flex items-center justify-center"
        >
          {#if app.component}
            <app.component
              isOpen={windows[app.id].open}
              onClose={() => closeApp(app.id)}
            />
          {/if}
        </div>
      {/if}
    {/each}
  </div>

  <Dock {windows} {appRegistry} {toggleApp} />
  <AltTab {windows} {appRegistry} />
</div>
