import * as v from "valibot";
import { Cell } from "../../domains/ui/components/grid/cell";
import { For } from "solid-js";
import { GridColumn } from "../../domains/ui/components/grid/grid-column";
import { HorizontalDivider } from "../../domains/ui/components/grid/horizontal-divider";
import { defineComponent } from "../../domains/_core/utils/solid-js";

interface ValibotErrorContentProps {
  issues: Array<v.BaseIssue<unknown>>;
}

export const ValibotErrorContent = defineComponent<ValibotErrorContentProps>((props) => {
  return (
    <>
      <h2>An error happened during import</h2>
      <p>The imported file contains errors.</p>
      <p>Fix them and try to re-import your file.</p>
      <GridColumn template="repeat(3, max-content)" xAlign="center">
        <Cell xAlign="left" bold text="JSON Path" />
        <Cell text="" />
        <Cell xAlign="left" bold text="Error" />
        <HorizontalDivider column={3} thicknessFactor={2} />
        <For each={props.issues}>
          {(issue) => (
            <>
              <Cell xAlign="left" text={JSON.stringify(v.getDotPath(issue)?.split("."), undefined, 2)} />
              <Cell text="➔" />
              <Cell xAlign="left" text={issue.message} />
              <HorizontalDivider column={3} />
            </>
          )}
        </For>
      </GridColumn>
    </>
  );
});
