import { writable } from "svelte/store";

export const desktopSettings = $state({
  autohide: true,
});
