<script>
  import { onMount } from "svelte";
  import WelcomeApp from "$lib/apps/WelcomeApp.svelte";
  import NotesApp from "$lib/apps/NotesApp.svelte";
  import SettingsApp from "$lib/apps/SettingsApp.svelte";
  import Dock from "$lib/components/Dock.svelte";
  import Icon from "@iconify/svelte";

  let currentTime = $state("");
  let connectionType = $state("wifi");

  /** @type {{ welcome: boolean; notes: boolean; settings: boolean; [key: string]: boolean }} */
  let apps = $state({
    welcome: false,
    notes: false,
    settings: false,
  });

  onMount(() => {
    /** @type {*} */ (window).biggestIndex = 10;

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

    const nav = /** @type {*} */ (navigator);
    const connection =
      nav.connection || nav.mozConnection || nav.webkitConnection;

    const updateNetworkStatus = () => {
      if (!navigator.onLine) {
        connectionType = "none";
        return;
      }

      if (connection) {
        const type = connection.type || "wifi";
        if (type === "cellular" || type === "wimax") {
          connectionType = "cellular";
        } else if (type === "ethernet") {
          connectionType = "ethernet";
        } else {
          connectionType = "wifi";
        }
      } else {
        const isMobileDevice = /Mobi|Android|iPhone/i.test(navigator.userAgent);
        if (isMobileDevice) {
          connectionType = "cellular";
        } else {
          connectionType = "wifi";
        }
      }
    };

    updateNetworkStatus();
    if (connection) connection.addEventListener("change", updateNetworkStatus);
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      clearInterval(timer);
      if (connection)
        connection.removeEventListener("change", updateNetworkStatus);
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  });

  /** @param {string} appName */
  function toggleApp(appName) {
    apps[appName] = !apps[appName];
  }

  /** * @param {KeyboardEvent} e
   * @param {string} appName
   */
  function handleKeyDown(e, appName) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleApp(appName);
    }
  }
</script>

<div class="desktop-wallpaper absolute inset-0 z-0 pointer-events-none"></div>
<div
  class="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_right,rgba(245,194,231,0.15),transparent_45%)] pointer-events-none"
></div>
<div
  class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_bottom_left,rgba(166,227,161,0.1),transparent_50%)] pointer-events-none"
></div>

<div
  class="absolute top-0 left-0 w-full h-8 flex justify-between items-center px-4 box-border backdrop-blur-xl bg-black/15 border-b border-white/5 text-white/90 z-1000 text-[13px] font-medium tracking-wide"
>
  <div class="flex items-center gap-4">
    <div class="font-bold text-white flex items-center gap-1">
      <Icon icon="mdi:fruit-citrus" class="w-4 h-4" />
      berryOS
    </div>

    <span
      class="hidden md:inline-block opacity-60 hover:opacity-100 cursor-pointer transition-opacity"
      >File</span
    >
    <span
      class="hidden md:inline-block opacity-60 hover:opacity-100 cursor-pointer transition-opacity"
      >Edit</span
    >
    <span
      class="hidden md:inline-block opacity-60 hover:opacity-100 cursor-pointer transition-opacity"
      >View</span
    >
    <span
      class="hidden md:inline-block opacity-60 hover:opacity-100 cursor-pointer transition-opacity"
      >Window</span
    >
  </div>

  <div class="flex items-center gap-3.5">
    <div class="flex items-center gap-2 opacity-75">
      {#if connectionType === "wifi"}
        <Icon
          icon="mdi:wifi"
          class="w-4 h-4 cursor-pointer hover:text-[#f5c2e7]"
        />
      {:else if connectionType === "ethernet"}
        <Icon
          icon="mdi:ethernet-cable"
          class="w-4 h-4 cursor-pointer hover:text-[#f5c2e7]"
        />
      {:else if connectionType === "cellular"}
        <Icon
          icon="mdi:signal-cellular-3"
          class="w-4 h-4 cursor-pointer hover:text-[#f5c2e7]"
        />
      {:else}
        <Icon icon="mdi:wifi-off" class="w-4 h-4 cursor-pointer text-red-400" />
      {/if}

      <Icon
        icon="mdi:battery-80"
        class="w-4 h-4 cursor-pointer hover:text-[#f5c2e7]"
      />
      <Icon
        icon="mdi:tune-vertical"
        class="w-4 h-4 cursor-pointer hover:text-[#f5c2e7]"
      />
    </div>

    <div class="w-px h-3 bg-white/20"></div>

    <p class="font-normal font-sans tracking-normal opacity-85">
      {currentTime || "TIME"}
    </p>
  </div>
</div>

<WelcomeApp isOpen={apps.welcome} onClose={() => (apps.welcome = false)} />
<NotesApp isOpen={apps.notes} onClose={() => (apps.notes = false)} />
<SettingsApp isOpen={apps.settings} onClose={() => (apps.settings = false)} />

<div class="pt-12 pl-4 h-[calc(100vh-32px)] box-border"></div>

<Dock {apps} {toggleApp} {handleKeyDown} />
