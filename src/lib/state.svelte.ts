const getSystemTheme = () => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }
  return "dark";
};

type DesktopSettings = {
  autohide: boolean;
  theme: "light" | "dark";
  customWallpaper: string | null;
};

export const desktopSettings = $state<DesktopSettings>({
  autohide: false,
  theme: getSystemTheme(),
  customWallpaper: null,
});

if (typeof window !== "undefined" && window.matchMedia) {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      desktopSettings.theme = e.matches ? "dark" : "light";
    });
}
