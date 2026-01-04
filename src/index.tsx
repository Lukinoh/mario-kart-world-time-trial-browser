/* @refresh reload */
import "solid-devtools";
import "./domains/ui/global-styles";
import { App } from "./app";
import { assert } from "./domains/_core/utils/assert";
import { render } from "solid-js/web";

const root = document.querySelector("#root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

assert(root, "Root element not found.");
render(() => <App />, root);
