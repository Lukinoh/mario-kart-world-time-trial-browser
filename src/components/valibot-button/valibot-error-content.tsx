import * as v from "valibot";
import { Cell } from "../attempts-table/components/cell";
import { For } from "solid-js";
import { HorizontalDivider } from "../attempts-table/components/horizontal-divider";
import { css } from "@emotion/css";
import { defineComponent } from "../../tools/utils";

const sGrid = css({
  display: "grid",
  gridTemplateColumns: `repeat(3, max-content)`,
  textAlign: "center",
  "*": {
    padding: "var(--mk-spacing-medium)",
  },
});

interface ValibotErrorContentProps {
  issues: Array<v.BaseIssue<unknown>>;
}

export const ValibotErrorContent = defineComponent<ValibotErrorContentProps>((props) => {
  return (
    <>
      <h2>An error happened during import</h2>
      <p>The imported file contains errors.</p>
      <p>Fix them and try to re-import your file.</p>
      <div class={sGrid}>
        <Cell align="left" bold text="JSON Path" />
        <Cell text="" />
        <Cell align="left" bold text="Error" />
        <HorizontalDivider column={3} thicknessFactor={2} />
        <For each={props.issues}>
          {(issue) => (
            <>
              <Cell align="left" text={JSON.stringify(v.getDotPath(issue)?.split("."), undefined, 2)} />
              <Cell text="➔" />
              <Cell align="left" text={issue.message} />
              <HorizontalDivider column={3}></HorizontalDivider>
            </>
          )}
        </For>
      </div>
    </>
  );
});
