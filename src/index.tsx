/* @refresh reload */
import "solid-devtools";
import "./domains/ui/global-styles";
import { OBS_POPUP_TARGET } from "./domains/obs/constants";
import { assert } from "./domains/_core/utils/assert";
import { render } from "solid-js/web";

const root = document.querySelector("#root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

assert(root, "Root element not found.");

if (window.name === OBS_POPUP_TARGET) {
  const { PopupObs } = await import("./domains/obs/popup-obs");
  render(() => <PopupObs />, root);
} else {
  const { App } = await import("./app");
  render(() => <App />, root);
}
