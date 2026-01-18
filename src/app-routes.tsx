import { A, Navigate, Route, type RouteSectionProps, useCurrentMatches } from "@solidjs/router";
import { type Component, createMemo } from "solid-js";
import { AloneDialog } from "./domains/_core/components/alone-dialog/alone-dialog";
import { Friends } from "./views/friends";
import { History } from "./views/history";
import { Live } from "./views/live";
import { Readme } from "./views/readme/readme";
import { TimeTrialPlayer } from "./domains/time-trial/components/time-trial-player";
import { WorldRecords } from "./views/world-records";
import { css } from "@emotion/css";
import { displayVisible } from "./domains/ui/css/css";
import { setupObsEmitter } from "./domains/obs/compositions/setup-obs-emitter";
import { usePageTitle } from "./views/compositions/use-page-title";

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
  const AppWrapper: Component<RouteSectionProps> = (props) => {
    const { title } = usePageTitle();
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
      <Route path="live" component={Live} />
      <Route path="history" component={History} />
      <Route path="friends" component={Friends} />
      <Route path="world-records" component={WorldRecords} />
      <Route path="readme" component={Readme} />
      <Route path="*404" component={() => <Navigate href="live" />} />
    </Route>
  );
};
