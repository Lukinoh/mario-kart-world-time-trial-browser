import { type Component, Match, Switch, createMemo, onMount } from "solid-js";
import { A } from "@solidjs/router";
import { AttemptsComparisonTable } from "../domains/attempt/components/attempts-comparison-table/attempts-comparison-table";
import { AttemptsTable } from "../domains/attempt/components/attempts-table";
import type { ViewProps } from "../domains/_core/utils/solid-js";
import { usePersonalRepository } from "../domains/database/compositions/use-personal-repository";
import { useRepositories } from "../domains/database/compositions/use-repositories";

export const Live: Component<ViewProps> = (props) => {
  const repositories = useRepositories();
  const personal = usePersonalRepository();

  const selectedTrack = createMemo(() => personal.lastAttempt()?.raw.track);

  onMount(() => {
    props.setTitle("Live");
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
                First time here? Probably, you should give a look at the <A href="/faq">FAQ</A>.
              </p>
              <p>You need at least one attempt to display the comparison table.</p>
            </Match>
          </Switch>
        </div>
        <div>
          <h3>Last 7 attempts</h3>
          <AttemptsTable
            attempts={personal.attempts()}
            track={selectedTrack()}
            showFilters={false}
            showTrack={false}
            limit={7}
          />
        </div>
      </div>
    </>
  );
};
