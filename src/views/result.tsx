import { type Component, onMount } from "solid-js";
import { AttemptsTable } from "../domains/attempt/components/attempts-table";
import { Cell } from "../domains/ui/components/grid/cell";
import { GridColumn } from "../domains/ui/components/grid/grid-column";
import { VerticalDivider } from "../domains/ui/components/grid/vertical-divider";
import { cellCss } from "../domains/ui/css/cell-css";
import { css } from "@emotion/css";
import { useAttemptsFilter } from "../domains/attempt/components/attempts-filter/use-attempts-filter";
import { usePageTitle } from "./compositions/use-page-title";
import { usePersonalRepository } from "../domains/database/compositions/use-personal-repository";

const sHeader = css({
  display: "flex",
  gap: "var(--mk-spacing-large)",
});

const sGrid = css({
  columnGap: "var(--mk-spacing-large)",
});

const sTime = cellCss({
  mono: true,
});

export const Result: Component = () => {
  const personal = usePersonalRepository();
  const { setTitle } = usePageTitle();
  const { filtered, AttemptsFilter } = useAttemptsFilter({
    input: {
      timeRecords: personal.getTimeRecords,
      splitRecords: personal.getSplitRecords,
    },
  });

  onMount(() => {
    setTitle("Result");
  });

  return (
    <>
      <div class={sHeader}>
        <AttemptsFilter />
        <GridColumn class={sGrid} template="repeat(3, auto)" spacing="small" yAlign="center">
          <VerticalDivider />
          <Cell text="Sum of all your personal bests" />
          <Cell
            text={`${personal.getSumTimeRecords().time} (${personal.getSumTimeRecords().trackCount} tracks)`}
            css={sTime}
          />
        </GridColumn>
      </div>

      <h2>Personal best</h2>
      <AttemptsTable attempts={filtered().timeRecords} />
      <h2>Best personal splits</h2>
      <AttemptsTable attempts={filtered().splitRecords} />
    </>
  );
};
