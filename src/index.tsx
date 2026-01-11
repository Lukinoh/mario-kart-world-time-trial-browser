/* @refresh reload */
import "solid-devtools";
import { OBS_POPUP_TARGET } from "./domains/obs/constants";
import { assert } from "./domains/_core/utils/assert";
import { injectFavicon } from "./domains/_core/utils/favicon";
import { injectGlobalStyles } from "./domains/ui/global-styles";
import logo from "./assets/icons/original-no-background-stylized.png";
import { render } from "solid-js/web";

const root = document.querySelector("#root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

injectFavicon(logo);

assert(root, "Root element not found.");

if (window.name === OBS_POPUP_TARGET) {
  injectGlobalStyles("popup-obs");
  const { PopupObs } = await import("./domains/obs/popup-obs");
  render(() => <PopupObs />, root);
} else {
  injectGlobalStyles("app");
  const { App } = await import("./app");
  render(() => <App />, root);
}
