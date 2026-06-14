<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  type AppId = "welcome" | "notes" | "settings";

  type WindowState = {
    open: boolean;
    minimized: boolean;
    focused: boolean;
  };

  type Props = {
    windows: Record<AppId, WindowState>;
    appRegistry: { id: AppId; icon: string; label: string }[];
  };

  let { windows, appRegistry }: Props = $props();

  let isVisible = $state(false);
  let index = $state(0);

  let openApps = $derived(
    appRegistry.map((a) => a.id).filter((id) => windows[id].open),
  );

  function handleKeyDown(e: KeyboardEvent) {
    if (e.altKey && e.key === "Tab") {
      e.preventDefault();
      isVisible = true;
      index = (index + 1) % Math.max(openApps.length, 1);
    }
  }

  function handleKeyUp(e: KeyboardEvent) {
    if (e.key === "Alt") {
      isVisible = false;

      const selected = openApps[index];
      if (selected) {
        const el = document.querySelector(`[data-app-name="${selected}"]`);
        el?.dispatchEvent(new CustomEvent("bringToFront", { bubbles: true }));
      }
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  });
</script>

{#if isVisible}
  <div
    class="fixed inset-0 z-9999 flex items-center justify-center bg-black/20"
  >
    <div class="flex gap-3 bg-black/60 p-4 rounded-xl">
      {#each openApps as app, i}
        <div class={i === index ? "ring-2 ring-pink-400 p-2" : "p-2"}>
          <Icon icon={appRegistry.find((a) => a.id === app)?.icon ?? ""} />
          <div class="text-xs">{app}</div>
        </div>
      {/each}
    </div>
  </div>
{/if}
