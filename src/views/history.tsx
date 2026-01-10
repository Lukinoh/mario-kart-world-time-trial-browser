import { Match, Switch, createSignal, onMount } from "solid-js";
import { type ViewProps, defineComponent } from "../domains/_core/utils/solid-js";
import { AttemptsTable } from "../domains/attempt/components/attempts-table";
import { ValibotImportButton } from "../domains/database/components/valibot-import-button/valibot-import-button";
import { VerticalDivider } from "../domains/ui/components/grid/vertical-divider";
import { css } from "@emotion/css";
import { usePersonalRepository } from "../domains/database/compositions/use-personal-repository";

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
  const personal = usePersonalRepository();
  const [selectedTrack, setSelectedTrack] = createSignal<string>();

  onMount(() => {
    props.setTitle("History");
  });

  return (
    <>
      <div class={sActions}>
        <ValibotImportButton onClick={personal.addFromJSON}>Add</ValibotImportButton>
        <ValibotImportButton onClick={personal.replaceFromJSON}>Replace</ValibotImportButton>
        <VerticalDivider />
        <button onClick={personal.exportToJSON}>Export</button>
        <button onClick={personal.exportForFriendsToJSON}>Export for friends</button>
        <VerticalDivider />
        <button onClick={personal.shrink}>Shrink</button>
        <VerticalDivider />
        <div class={sTries}>
          <Switch>
            <Match when={selectedTrack()}>
              {(track) => (
                <>
                  All times tries on {selectedTrack()}: <mark>{personal.getAttemptsCountByTrack(track())}</mark>
                </>
              )}
            </Match>
            <Match when={true}>
              All times tries on All tracks: <mark>{personal.getAttemptsCount()}</mark>
            </Match>
          </Switch>
        </div>
      </div>
      <AttemptsTable attempts={personal.attempts()} onTrackSelected={setSelectedTrack} />
    </>
  );
});
