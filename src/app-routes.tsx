import { A, Navigate, Route, type RouteSectionProps, useCurrentMatches } from "@solidjs/router";
import { type Component, createMemo } from "solid-js";
import { AloneDialog } from "./domains/_core/components/alone-dialog/alone-dialog";
import { Friends } from "./views/friends";
import { History } from "./views/history";
import { Live } from "./views/live";
import { Readme } from "./views/readme/readme";
import { Results } from "./views/results";
import { SymbolButton } from "./domains/ui/components/buttons/symbol-button";
import { TimeTrialPlayer } from "./domains/time-trial/components/time-trial-player";
import { ValibotImportButton } from "./domains/database/components/valibot-import-button/valibot-import-button";
import { WorldRecords } from "./views/world-records";
import { css } from "@emotion/css";
import { displayVisible } from "./domains/ui/css/css";
import { setupObsEmitter } from "./domains/obs/compositions/setup-obs-emitter";
import { usePageTitle } from "./views/compositions/use-page-title";
import { useRepositories } from "./domains/database/compositions/use-repositories";

const sNav = css({
  display: "flex",
  alignItems: "center",
  whiteSpace: "nowrap",
  "> *": {
    marginBottom: 0,
  },
});

const sVersion = css({
  marginLeft: "auto",
  textDecoration: "underline",
  border: "none",
  padding: 0,
});

const sImportExport = css({
  margin: "0 0.25rem",
});

export const AppRoutes: Component = () => {
  const AppWrapper: Component<RouteSectionProps> = (props) => {
    const { title } = usePageTitle();
    const repositories = useRepositories();
    const matches = useCurrentMatches();
    const sTimeTrialVisible = createMemo(() => displayVisible(matches().at(2)?.route.originalPath === "live"));
    setupObsEmitter();

    return (
      <>
        <header>
          <nav class={sNav}>
            <A href="/live">Live</A>
            <A href="/results">Results</A>
            <A href="/world-records">World Records</A>
            <A href="/history">History</A>
            <A href="/friends">Friends</A>

            <A
              target="_blank"
              href="https://github.com/Lukinoh/mario-kart-world-time-trial-browser/blob/release/CHANGELOG.md"
              class={sVersion}
            >
              {__APP_VERSION__}
            </A>
            <A href="/readme">Readme 🥺</A>
            <ValibotImportButton class={sImportExport} title="Import" symbol="📥" onClick={repositories.restore} />
            <SymbolButton class={sImportExport} title="Export" symbol="📤" onClick={repositories.download} />
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
      <Route path="live" component={Live} />
      <Route path="results" component={Results} />
      <Route path="world-records" component={WorldRecords} />
      <Route path="history" component={History} />
      <Route path="friends" component={Friends} />
      <Route path="readme" component={Readme} />
      <Route path="*404" component={() => <Navigate href="live" />} />
    </Route>
  );
};
