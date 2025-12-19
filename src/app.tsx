import { Navigate, Route, Router } from "@solidjs/router";
import { Show, createSignal } from "solid-js";
import { Debug } from "./views/debug";
import { FAQ } from "./views/faq";
import { Friends } from "./views/friends";
import { History } from "./views/history";
import { Live } from "./views/live";
import { WorldRecords } from "./views/world-records";
import { defineComponent } from "./tools/utils";
import { useTimeTrial } from "./compositions/use-time-trial";

export const App = defineComponent(() => {
  const timeTrial = useTimeTrial("TIME_UPDATE", true);
  const [isDebug, setIsDebug] = createSignal(false);

  return (
    <>
      <header>
        <nav>
          <a href="/live">Live</a>
          <a href="/history">History</a>
          <a href="/friends">Friends</a>
          <a href="/world-records">World Records</a>
          <a href="/faq">FAQ</a>
          <Show when={isDebug()}>
            <a href="/debug">Debug</a>
          </Show>
        </nav>
      </header>
      <Router>
        <Route path="/" component={() => <Navigate href="/live" />} />
        <Route path="/live" component={Live} />
        <Route path="/history" component={History} />
        <Route path="/friends" component={Friends} />
        <Route path="/world-records" component={WorldRecords} />
        <Route path="/faq" component={FAQ} />
        <Route path="*404" component={() => <Navigate href="/live" />} />
        <Route
          path="/debug"
          component={() => {
            setIsDebug(true);
            return <Debug timeTrial={timeTrial}></Debug>;
          }}
        />
      </Router>
    </>
  );
});
