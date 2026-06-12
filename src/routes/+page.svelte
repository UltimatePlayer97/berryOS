<script>
  import { onMount } from "svelte";
  import { base } from "$app/paths";

  import WelcomeApp from "$lib/apps/WelcomeApp.svelte";
  import NotesApp from "$lib/apps/NotesApp.svelte";

  let currentTime = $state("");

  let apps = $state({
    welcome: false,
    notes: false,
  });

  onMount(() => {
    /** @type {*} */ (window).biggestIndex = 10;
    const updateTime = () => (currentTime = new Date().toLocaleString());
    const timer = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(timer);
  });

  /** @param {'welcome' | 'notes'} appName */
  function toggleApp(appName) {
    apps[appName] = !apps[appName];
  }

  /** @param {KeyboardEvent} e @param {'welcome' | 'notes'} appName */
  function handleKeyDown(e, appName) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleApp(appName);
    }
  }
</script>

<div
  class="absolute top-0 left-0 w-full h-10 flex justify-between items-center px-4 box-border backdrop-blur-md bg-black/40 text-white z-[1000] select-none"
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

<div class="pt-16 pl-4 h-[calc(100vh-100px)]"></div>

<div
  class="group/dock fixed bottom-0 left-0 w-full h-16 flex justify-center items-end pb-2 pointer-events-auto z-[2000]"
>
  <div
    class="flex items-end gap-3 bg-white/10 backdrop-blur-xl px-3 py-2 rounded-[20px] border border-white/20 shadow-2xl opacity-0 translate-y-4 pointer-events-none transition-all duration-200 ease-out group-hover/dock:opacity-100 group-hover/dock:translate-y-0 group-hover/dock:pointer-events-auto"
  >
    <div
      role="button"
      tabindex="0"
      class="group relative cursor-pointer pb-1.5 transition-transform duration-200 ease-out hover:scale-115 hover:-translate-y-1.5 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#f5c2e7] after:rounded-full after:opacity-0 after:transition-all outline-none"
      class:after:opacity-100={apps.welcome}
      class:after:shadow-[0_0_6px_2px_#f5c2e7]={apps.welcome}
      onclick={() => toggleApp("welcome")}
      onkeydown={(e) => handleKeyDown(e, "welcome")}
    >
      <img
        src="{base}/assets/welcome.jpg"
        alt="Welcome"
        class="w-12 h-12 rounded-xl block object-cover shadow-md transition-all"
        class:shadow-[0_0_12px_rgba(245,194,231,0.6)]={apps.welcome}
      />
      <span
        class="absolute -top-10 left-1/2 -translate-x-1/2 scale-80 bg-black/75 text-white px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-all group-hover:opacity-100 group-hover:scale-100"
        >Welcome</span
      >
    </div>

    <div
      role="button"
      tabindex="0"
      class="group relative cursor-pointer pb-1.5 transition-transform duration-200 ease-out hover:scale-115 hover:-translate-y-1.5 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#f5c2e7] after:rounded-full after:opacity-0 after:transition-all outline-none"
      class:after:opacity-100={apps.notes}
      class:after:shadow-[0_0_6px_2px_#f5c2e7]={apps.notes}
      onclick={() => toggleApp("notes")}
      onkeydown={(e) => handleKeyDown(e, "notes")}
    >
      <img
        src="{base}/assets/notes.jpg"
        alt="Notes"
        class="w-12 h-12 rounded-xl block object-cover shadow-md transition-all"
        class:shadow-[0_0_12px_rgba(245,194,231,0.6)]={apps.notes}
      />
      <span
        class="absolute -top-10 left-1/2 -translate-x-1/2 scale-80 bg-black/75 text-white px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-all group-hover:opacity-100 group-hover:scale-100"
        >Notes</span
      >
    </div>
  </div>
</div>
