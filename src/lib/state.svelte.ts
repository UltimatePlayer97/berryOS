const getSystemTheme = () => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }
  return "dark";
};

export const desktopSettings = $state({
  autohide: false,
  theme: getSystemTheme(),
});

if (typeof window !== "undefined" && window.matchMedia) {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      desktopSettings.theme = e.matches ? "dark" : "light";
    });
}
