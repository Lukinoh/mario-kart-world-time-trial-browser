import { A, Navigate, Route, type RouteSectionProps, useCurrentMatches } from "@solidjs/router";
import { type Component, createMemo, createSignal } from "solid-js";
import { AloneDialog } from "./domains/_core/components/alone-dialog/alone-dialog";
import { Friends } from "./views/friends";
import { History } from "./views/history";
import { Live } from "./views/live";
import { Readme } from "./views/readme/readme";
import { TimeTrialPlayer } from "./domains/time-trial/components/time-trial-player";
import { WorldRecords } from "./views/world-records";
import { ci } from "./domains/_core/utils/solid-js";
import { css } from "@emotion/css";
import { displayVisible } from "./domains/ui/css/css";
import { setupObsEmitter } from "./domains/obs/compositions/setup-obs-emitter";

const sNav = css({
  display: "flex",
  whiteSpace: "nowrap",
});

const sVersion = css({
  alignSelf: "center",
  marginBottom: "1rem",
  marginLeft: "auto",
  // Align with simple.css
  "@media only screen and (max-width: 720px)": {
    lineHeight: 1,
  },
});

export const AppRoutes: Component = () => {
  const [title, setTitle] = createSignal("Nothing yet");

  const AppWrapper: Component<RouteSectionProps> = (props) => {
    const matches = useCurrentMatches();
    const sTimeTrialVisible = createMemo(() => displayVisible(matches().at(2)?.route.originalPath === "live"));
    setupObsEmitter();

    return (
      <>
        <header>
          <nav class={sNav}>
            <A href="/live">Live</A>
            <A href="/history">History</A>
            <A href="/friends">Friends</A>
            <A href="/world-records">World Records</A>

            <span class={sVersion}>{__APP_VERSION__}</span>
            <A href="/readme">Readme 🥺</A>
          </nav>
        </header>
        <main>
          <h1>{title()}</h1>
          <div class={sTimeTrialVisible()}>
            <TimeTrialPlayer />
          </div>
          {props.children}
        </main>
        <AloneDialog />
      </>
    );
  };

  return (
    <Route component={AppWrapper}>
      {/* The ci methods breaks hot reload */}
      <Route path="live" component={ci(Live, { setTitle })} />
      <Route path="history" component={ci(History, { setTitle })} />
      <Route path="friends" component={ci(Friends, { setTitle })} />
      <Route path="world-records" component={ci(WorldRecords, { setTitle })} />
      <Route path="readme" component={ci(Readme, { setTitle })} />
      <Route path="*404" component={() => <Navigate href="live" />} />
    </Route>
  );
};
