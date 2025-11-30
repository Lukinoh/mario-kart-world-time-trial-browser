/* @refresh reload */
import "solid-devtools";
import "simpledotcss/simple.min.css";
import { App } from "./app";
import { assert } from "./tools/utils";
import { css } from "@emotion/css";
import { render } from "solid-js/web";

const root = document.querySelector("#root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

assert(root, "Root element not found.");

// Override for simpledotcss
const sBody = css({
  gridTemplateColumns: "1fr 90% 1fr",
});
document.body.classList.add(sBody);

render(() => <App />, root);
