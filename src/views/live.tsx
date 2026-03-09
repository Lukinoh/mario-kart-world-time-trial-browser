import { type Component, Match, Switch, createEffect, onMount } from "solid-js";
import { A } from "@solidjs/router";
import { AttemptsComparisonTable } from "../domains/attempt/components/attempts-comparison-table/attempts-comparison-table";
import { AttemptsTable } from "../domains/attempt/components/attempts-table";
import { useAttemptsFilter } from "../domains/attempt/components/attempts-filter/use-attempts-filter";
import { usePageTitle } from "./compositions/use-page-title";
import { usePersonalRepository } from "../domains/database/compositions/use-personal-repository";
import { useRepositories } from "../domains/database/compositions/use-repositories";

export const Live: Component = () => {
  const ATTEMPTS_LIMIT = 7;
  const repositories = useRepositories();
  const personal = usePersonalRepository();
  const { setTitle } = usePageTitle();
  const { filtered, selectedTrack, setFilter } = useAttemptsFilter({
    input: {
      attempts: personal.attempts,
    },
  });

  createEffect(() => {
    setFilter(personal.lastAttempt()?.raw.track);
  });

  onMount(() => {
    setTitle("Live");
  });

  return (
    <>
      <h2>{selectedTrack()}</h2>
      <div>
        <div>
          <h3>Comparison</h3>
          <Switch>
            <Match when={personal.lastAttempt()}>
              {(last) => (
                <AttemptsComparisonTable
                  last={last()}
                  referenceRecords={repositories.getReferenceRecords(last().raw.track)}
                />
              )}
            </Match>
            <Match when={true}>
              <p>
                First time here? Probably, you should give a look at the <A href="/readme">Readme</A>.
              </p>
              <p>You need at least one attempt to display the comparison table.</p>
            </Match>
          </Switch>
        </div>
        <div>
          <h3>Last {ATTEMPTS_LIMIT} attempts</h3>
          <AttemptsTable attempts={filtered().attempts} showTrack={false} limit={ATTEMPTS_LIMIT} />
        </div>
      </div>
    </>
  );
};
