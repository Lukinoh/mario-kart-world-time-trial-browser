import { Match, Switch, createMemo, onMount } from "solid-js";
import { type ViewProps, defineComponent } from "../domains/_core/utils/solid-js";
import { A } from "@solidjs/router";
import { AttemptsComparisonTable } from "../domains/attempt/components/attempts-comparison-table/attempts-comparison-table";
import { AttemptsTable } from "../domains/attempt/components/attempts-table";
import { useStorage } from "../domains/storage/compositions/use-storage";

export const Live = defineComponent<ViewProps>((props) => {
  const storage = useStorage();

  const selectedTrack = createMemo(() => storage.personal.lastAttempt()?.raw.track);

  onMount(() => {
    props.setTitle("Live");
  });

  return (
    <>
      <h2>{selectedTrack()}</h2>
      <h3>Comparison</h3>
      <Switch>
        <Match when={storage.personal.lastAttempt()}>
          {(last) => (
            <AttemptsComparisonTable last={last()} referenceRecords={storage.getReferenceRecords(last().raw.track)} />
          )}
        </Match>
        <Match when={true}>
          <p>
            First time here? Probably, you should give a look at the <A href="/faq">FAQ</A>.
          </p>
          <p>You need at least one attempt to display the comparison table.</p>
        </Match>
      </Switch>
      <h3>Last 7 attempts</h3>
      <AttemptsTable
        attempts={storage.personal.attempts()}
        track={selectedTrack()}
        showFilters={false}
        showTrack={false}
        limit={7}
      />
    </>
  );
});
