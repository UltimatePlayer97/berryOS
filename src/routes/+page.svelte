<script>
  import { onMount } from "svelte";
  import WelcomeApp from "$lib/apps/WelcomeApp.svelte";
  import NotesApp from "$lib/apps/NotesApp.svelte";
  import SettingsApp from "$lib/apps/SettingsApp.svelte";
  import Dock from "$lib/components/Dock.svelte";

  let currentTime = $state("");

  /** @type {{ welcome: boolean; notes: boolean; settings: boolean; [key: string]: boolean }} */
  let apps = $state({
    welcome: false,
    notes: false,
    settings: false,
  });

  onMount(() => {
    /** @type {*} */ (window).biggestIndex = 10;
    const updateTime = () => (currentTime = new Date().toLocaleString());
    const timer = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(timer);
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

<div
  class="absolute top-0 left-0 w-full h-10 flex justify-between items-center px-4 box-border backdrop-blur-md bg-black/40 text-white z-1000 select-none"
>
  <button
    type="button"
    class="cursor-pointer font-bold m-0 bg-transparent border-0 text-white p-0 text-base normal-case outline-none"
    onclick={() => (apps.welcome = true)}
  >
    berryOS
  </button>
  <p>{currentTime || "TIME"}</p>
</div>

<WelcomeApp isOpen={apps.welcome} onClose={() => (apps.welcome = false)} />
<NotesApp isOpen={apps.notes} onClose={() => (apps.notes = false)} />
<SettingsApp isOpen={apps.settings} onClose={() => (apps.settings = false)} />

<div class="pt-16 pl-4 h-[calc(100vh-100px)]"></div>

<Dock {apps} {toggleApp} {handleKeyDown} />
