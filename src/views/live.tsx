import { Match, Switch, createMemo, onMount } from "solid-js";
import { type ViewProps, defineComponent } from "../core/helpers/solid-js";
import { AttemptsComparisonTable } from "../components/attempts-comparison-table/attempts-comparison-table";
import { AttemptsTable } from "../components/attempts-table/attempts-table";
import { useStorage } from "../compositions/storage/use-storage";

export const Live = defineComponent<ViewProps>((props) => {
  const storage = useStorage();

  const selectedTrack = createMemo(() => storage.personal.lastAttempt()?.raw.track);

  onMount(() => {
    props.setTitle("Live");
  });

  return (
    <>
      <h2>Comparison</h2>
      <Switch>
        <Match when={storage.personal.lastAttempt()}>
          {(last) => (
            <AttemptsComparisonTable last={last()} referenceRecords={storage.getReferenceRecords(last().raw.track)} />
          )}
        </Match>
        <Match when={true}>
          <p>You need at least one attempts to display the comparison table.</p>
        </Match>
      </Switch>
      <h2>Last 10 attempts</h2>
      <AttemptsTable
        attempts={storage.personal.attempts().slice(0, 10)}
        defaultTrack={selectedTrack()}
        showFilters={false}
      />
    </>
  );
});
