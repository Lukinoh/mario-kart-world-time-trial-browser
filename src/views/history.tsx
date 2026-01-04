import { Match, Switch, createSignal, onMount } from "solid-js";
import { type ViewProps, defineComponent } from "../core/helpers/solid-js";
import { AttemptsTable } from "../components/attempts-table/attempts-table";
import { ValibotImportButton } from "../components/valibot-button/valibot-import-button";
import { VerticalDivider } from "../components/grid-utilities/vertical-divider";
import { css } from "@emotion/css";
import { usePersonalStorage } from "../domains/storages/compositions/use-personal-storage";

const sActions = css({
  display: "flex",
  columnGap: "var(--mk-spacing-medium)",
  alignContent: "center",
  marginBottom: "var(--mk-spacing-large)",
  "> *": {
    marginBottom: 0,
  },
});

const sTries = css({
  alignContent: "center",
});

export const History = defineComponent<ViewProps>((props) => {
  const storage = usePersonalStorage();
  const [selectedTrack, setSelectedTrack] = createSignal<string>();

  onMount(() => {
    props.setTitle("History");
  });

  return (
    <>
      <div class={sActions}>
        <ValibotImportButton onclick={storage.addFromJSON}>Add</ValibotImportButton>
        <ValibotImportButton onclick={storage.replaceFromJSON}>Replace</ValibotImportButton>
        <VerticalDivider />
        <button onclick={storage.exportToJSON}>Export</button>
        <button onclick={storage.exportForFriendsToJSON}>Export for friends</button>
        <VerticalDivider />
        <button onclick={storage.shrink}>Shrink</button>
        <VerticalDivider />
        <div class={sTries}>
          <Switch>
            <Match when={selectedTrack()}>
              {(track) => (
                <>
                  All times tries on {selectedTrack()}: <mark>{storage.getAttemptsCountByTrack(track())}</mark>
                </>
              )}
            </Match>
            <Match when={true}>
              All times tries on All tracks: <mark>{storage.getAttemptsCount()}</mark>
            </Match>
          </Switch>
        </div>
      </div>
      <AttemptsTable attempts={storage.attempts()} onSelectedTrack={setSelectedTrack}></AttemptsTable>
    </>
  );
});
