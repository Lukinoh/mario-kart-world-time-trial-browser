import * as v from "valibot";
import { type Component, For } from "solid-js";
import { Cell } from "../../../ui/components/grid/cell";
import { GridColumn } from "../../../ui/components/grid/grid-column";
import { HorizontalDivider } from "../../../ui/components/grid/horizontal-divider";
import { cellCss } from "../../../ui/css/cell-css";

const sTitle = cellCss({
  bold: true,
  xAlign: "left",
});

const sValue = cellCss({
  xAlign: "left",
});

interface ValibotErrorContentProps {
  issues: Array<v.BaseIssue<unknown>>;
}

export const ValibotErrorContent: Component<ValibotErrorContentProps> = (props) => {
  const GRID_COLUMNS = 3;

  return (
    <>
      <p>The imported file contains errors.</p>
      <p>Fix them and try to re-import your file.</p>
      <GridColumn template="repeat(3, max-content)" xAlign="center">
        <Cell text="JSON Path" css={[sTitle]} />
        <Cell text="" />
        <Cell text="Error" css={[sTitle]} />
        <HorizontalDivider column={GRID_COLUMNS} thicknessFactor={2} />
        <For each={props.issues}>
          {(issue) => (
            <>
              <Cell text={JSON.stringify(v.getDotPath(issue)?.split("."), undefined, 2)} css={[sValue]} />
              <Cell text="➔" />
              <Cell text={issue.message} css={[sValue]} />
              <HorizontalDivider column={GRID_COLUMNS} />
            </>
          )}
        </For>
      </GridColumn>
    </>
  );
};
