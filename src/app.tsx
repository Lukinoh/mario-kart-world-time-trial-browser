import { Navigate, Route, type RouteSectionProps, Router, useLocation } from "@solidjs/router";
import { ci, defineComponent } from "./core/helpers/solid-js";
import { createMemo, createSignal } from "solid-js";
import { AloneDialog } from "./components/alone-dialog";
import { FAQ } from "./views/faq";
import { Friends } from "./views/friends";
import { History } from "./views/history";
import { Live } from "./views/live";
import { TimeTrialPlayer } from "./components/time-trial-player/time-trial-player";
import { WorldRecords } from "./views/world-records";
import { useTimeTrial } from "./compositions/use-time-trial";

export const App = defineComponent(() => {
  const timeTrial = useTimeTrial();
  const [title, setTitle] = createSignal("Nothing yet");

  const RouterWrapper = defineComponent<RouteSectionProps>((props) => {
    const location = useLocation();
    const showTimeTrialPlayer = createMemo(() => {
      return ["/live"].includes(location.pathname) ? "" : "display: none";
    });

    return (
      <>
        <h1>{title()}</h1>
        <div style={showTimeTrialPlayer()}>
          <TimeTrialPlayer timeTrial={timeTrial} />
        </div>
        {props.children}
      </>
    );
  });

  return (
    <>
      <header>
        <nav>
          <a href="/live">Live</a>
          <a href="/history">History</a>
          <a href="/friends">Friends</a>
          <a href="/world-records">World Records</a>
          <a href="/faq">FAQ</a>
        </nav>
      </header>
      <main>
        <AloneDialog />
        <Router root={RouterWrapper}>
          <Route path="/" component={() => <Navigate href="/live" />} />
          <Route path="/live" component={ci(Live, { setTitle })} />
          <Route path="/history" component={ci(History, { setTitle })} />
          <Route path="/friends" component={ci(Friends, { setTitle })} />
          <Route path="/world-records" component={ci(WorldRecords, { setTitle })} />
          <Route path="/faq" component={ci(FAQ, { setTitle })} />
          <Route path="*404" component={() => <Navigate href="/live" />} />
        </Router>
      </main>
    </>
  );
});
