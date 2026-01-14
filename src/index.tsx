/* @refresh reload */
import "solid-devtools";
import { AppRoutes } from "./app-routes";
import { PopupObs } from "./domains/obs/popup-obs";
import { Route } from "@solidjs/router";
import { assert } from "./domains/_core/utils/assert";
import { injectFavicon } from "./domains/_core/utils/favicon";
import { injectGlobalStyles } from "./domains/ui/global-styles";
import logo from "./assets/icons/original-no-background-stylized.png";
import { render } from "solid-js/web";
import { useRouter } from "./domains/_core/compositions/use-router";

const root = document.querySelector("#root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

injectFavicon(logo);
injectGlobalStyles();

assert(root, "Root element not found.");

render(() => {
  const { Router } = useRouter();
  return (
    <Router>
      <Route path="obs" component={PopupObs}></Route>
      <Route path="*">
        <AppRoutes />
      </Route>
    </Router>
  );
}, root);
