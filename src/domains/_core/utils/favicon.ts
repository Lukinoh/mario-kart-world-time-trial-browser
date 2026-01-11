export function injectFavicon(url: string): void {
  const icon = document.createElement("link");
  icon.rel = "icon";
  icon.type = "image/png";
  icon.href = url;
  document.head.prepend(icon);
}
