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
  accentColor: string;
};

export const desktopSettings = $state<DesktopSettings>({
  autohide: false,
  theme: getSystemTheme(),
  customWallpaper: null,
  accentColor: "#ea76cb",
});

if (typeof window !== "undefined" && window.matchMedia) {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      desktopSettings.theme = e.matches ? "dark" : "light";
    });
}
