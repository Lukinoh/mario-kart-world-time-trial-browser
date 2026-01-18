import { type Component, type JSX, Show, createSignal, onMount } from "solid-js";
import { ALL_TRACKS } from "../domains/attempt/constants";
import { AttemptsTable } from "../domains/attempt/components/attempts-table";
import { Cell } from "../domains/ui/components/grid/cell";
import { GridColumn } from "../domains/ui/components/grid/grid-column";
import { ValibotImportButton } from "../domains/database/components/valibot-import-button/valibot-import-button";
import { VerticalDivider } from "../domains/ui/components/grid/vertical-divider";
import { cellCss } from "../domains/ui/css/cell-css";
import { css } from "@emotion/css";
import { usePageTitle } from "./compositions/use-page-title";
import { usePersonalRepository } from "../domains/database/compositions/use-personal-repository";

const sActions = css({
  display: "flex",
  columnGap: "var(--mk-spacing-medium)",
  alignContent: "center",
  alignItems: "center",
  marginBottom: "var(--mk-spacing-large)",
  "> *": {
    marginBottom: 0,
  },
});

const sGrid = css({
  columnGap: "var(--mk-spacing-large)",
});

const sTime = cellCss({
  mono: true,
});

export const History: Component = () => {
  const personal = usePersonalRepository();
  const [selectedTrack, setSelectedTrack] = createSignal(ALL_TRACKS);
  const { setTitle } = usePageTitle();

  onMount(() => {
    setTitle("History");
  });

  const Header = (): JSX.Element => {
    return (
      <GridColumn class={sGrid} template="repeat(3, auto)" spacing="small" yAlign="center">
        <VerticalDivider row={2} />
        <Show when={selectedTrack() === ALL_TRACKS}>
          <>
            <Cell text="Tries" />
            <Cell text={personal.getAttemptsCount()} />
            <Cell text="Total time" />
            <Cell
              text={`${personal.getSumTimeRecords().time} (${personal.getSumTimeRecords().trackCount} tracks)`}
              css={sTime}
            />
          </>
        </Show>
        <Show when={selectedTrack() !== ALL_TRACKS}>
          <>
            <Cell text="Tries" />
            <Cell text={personal.getAttemptsCountByTrack(selectedTrack())} />
            <Cell text="Best time" />
            <Cell text={personal.getTimeRecordsByTrack(selectedTrack()).at(0)?.time ?? "None"} css={sTime} />
          </>
        </Show>
      </GridColumn>
    );
  };

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
      </div>
      <AttemptsTable attempts={personal.attempts()} onTrackSelected={setSelectedTrack} headerSlot={<Header />} />
    </>
  );
};
