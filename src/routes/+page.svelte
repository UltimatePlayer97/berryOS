<script>
  import { onMount } from "svelte";
  import Window from "$lib/components/Window.svelte";
  import { base } from "$app/paths";

  let currentTime = $state("");

  let apps = $state({
    welcome: false,
    notes: false,
  });

  onMount(() => {
    window.biggestIndex = 10;
    const updateTime = () => (currentTime = new Date().toLocaleString());
    const timer = setInterval(updateTime, 1000);
    updateTime();

    return () => clearInterval(timer);
  });

  /** @param {'welcome' | 'notes'} appName */
  function toggleApp(appName) {
    apps[appName] = !apps[appName];
  }

  /** * @param {KeyboardEvent} e
   * @param {'welcome' | 'notes'} appName
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

<Window
  title="Welcome to berryOS"
  isOpen={apps.welcome}
  onClose={() => (apps.welcome = false)}
>
  <div class="flex flex-col items-center">
    <img
      src="/assets/star.png"
      alt="Star"
      class="w-25 h-25 object-cover rounded-full border-3 border-[#f5c2e7] mt-2"
    />
    <h1
      class="text-[#f5c2e7] text-3xl font-bold border-b-2 border-[#f5c2e7] pb-2 w-full text-center mt-2"
    >
      Welcome to berryOS
    </h1>
  </div>
  <hr class="border-0 border-t border-[#45475a] my-5" />
  <h2 class="text-[#f5c2e7] text-xl font-bold">
    User Profile: Developer & Gamer
  </h2>
  <p class="mt-2 text-white/80">
    <strong>Core Languages:</strong> Go, C#, and C++
  </p>
</Window>

<Window
  title="Hacker Notes"
  isOpen={apps.notes}
  onClose={() => (apps.notes = false)}
>
  <h1
    class="text-[#f5c2e7] text-3xl font-bold border-b-2 border-[#f5c2e7] pb-2 w-full"
  >
    Notes
  </h1>
  <hr class="border-0 border-t border-[#45475a] my-5" />
  <p class="text-white/80">
    Welcome to your workspace notes built with SvelteKit, Bun, and TailwindCSS!
  </p>
</Window>

<div class="pt-16 pl-4 h-[calc(100vh-100px)]"></div>

<div
  class="absolute bottom-3 left-0 w-full flex justify-center pointer-events-none z-2000"
>
  <div
    class="flex items-end gap-3 bg-white/10 backdrop-blur-xl px-3 py-2 rounded-[20px] border border-white/20 pointer-events-auto shadow-2xl"
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
        src="/assets/welcome.jpg"
        alt="Welcome"
        class="w-12.5 h-12.5 rounded-xl block object-cover shadow-md transition-all"
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
        src="/assets/notes.jpg"
        alt="Notes"
        class="w-12.5 h-12.5 rounded-xl block object-cover shadow-md transition-all"
        class:shadow-[0_0_12px_rgba(245,194,231,0.6)]={apps.notes}
      />
      <span
        class="absolute -top-10 left-1/2 -translate-x-1/2 scale-80 bg-black/75 text-white px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-all group-hover:opacity-100 group-hover:scale-100"
        >Notes</span
      >
    </div>
  </div>
</div>
