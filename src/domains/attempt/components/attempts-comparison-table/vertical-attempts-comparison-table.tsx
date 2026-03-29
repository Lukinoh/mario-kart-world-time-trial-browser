import { type Component, For, Match, Show, Switch } from "solid-js";
import { entries, values } from "remeda";
import type { Attempt } from "../../schemas/attempt";
import { Cell } from "../../../ui/components/grid/cell";
import { DeltaCell } from "./delta-cell";
import { F1Cell } from "./f1-cell";
import { GridColumn } from "../../../ui/components/grid/grid-column";
import { HorizontalDivider } from "../../../ui/components/grid/horizontal-divider";
import type { ReferenceRecords } from "../../types/reference-records";
import type { TimeRecordsSum } from "../../types/time-records-sum";
import { TimeWidthCell } from "./time-width-cell";
import { cellCss } from "../../../ui/css/cell-css";
import { delta } from "../../utils/delta";

const sTime = cellCss({
  mono: true,
});

const sTitle = cellCss({
  bold: true,
});

interface AttemptsComparisonTableProps {
  last: Attempt;
  referenceRecords: ReferenceRecords;
  timeRecordsSum: TimeRecordsSum;
}

export const VerticalAttemptsComparisonTable: Component<AttemptsComparisonTableProps> = (props) => {
  const GRID_FULL_COLUMN = 3;

  return (
    <GridColumn template={`repeat(${GRID_FULL_COLUMN}, max-content)`} xAlign="center" yAlign="center">
      {/* Line */}
      <Cell text="" />
      <TimeWidthCell text="S" />
      <TimeWidthCell text="ΣS" />

      <For each={props.last.laps}>
        {(_, sIndex) => (
          <>
            {/* Line */}
            <Cell text={`S${sIndex() + 1}`} />
            <Switch>
              <Match when={sIndex() === 0}>
                <F1Cell
                  column={2}
                  attempt={props.last}
                  sIndex={sIndex()}
                  type="time"
                  referencesRecords={props.referenceRecords}
                  css={sTime}
                />
              </Match>
              <Match when={true}>
                <>
                  <F1Cell
                    attempt={props.last}
                    sIndex={sIndex()}
                    type="time"
                    referencesRecords={props.referenceRecords}
                    css={sTime}
                  />
                  <F1Cell
                    attempt={props.last}
                    sIndex={sIndex()}
                    type="accumulatedTime"
                    referencesRecords={props.referenceRecords}
                    css={sTime}
                  />
                </>
              </Match>
            </Switch>
          </>
        )}
      </For>

      <HorizontalDivider column={GRID_FULL_COLUMN} thicknessFactor={2} />

      {/* Line */}
      <Switch>
        <Match when={props.last.splits.length === 0}>
          <Cell text="S1" css={sTitle} />
        </Match>
        <Match when={true}>
          <Cell text={`S${props.last.splits.length}`} css={sTitle} />
        </Match>
      </Switch>
      <Cell column={1} text="ΔS" />
      <Cell column={1} text="ΔΣS" />

      <For each={entries(props.referenceRecords)}>
        {([type, references]) => (
          <For each={references}>
            {(reference) => (
              <>
                {/* Line */}
                <Cell text={type} />
                <Switch>
                  <Match when={props.last.splits.length < 2}>
                    <DeltaCell
                      column={2}
                      text={delta(props.last, reference, props.last.splits.length - 1, "time")}
                      css={sTime}
                    />
                  </Match>
                  <Match when={true}>
                    <>
                      <DeltaCell
                        column={1}
                        text={delta(props.last, reference, props.last.splits.length - 1, "time")}
                        css={sTime}
                      />
                      <DeltaCell
                        column={1}
                        text={delta(props.last, reference, props.last.splits.length - 1, "accumulatedTime")}
                        css={sTime}
                      />
                    </>
                  </Match>
                </Switch>
              </>
            )}
          </For>
        )}
      </For>

      <HorizontalDivider column={GRID_FULL_COLUMN} thicknessFactor={2} />

      {/* Line */}
      <For each={entries(props.referenceRecords)}>
        {([type, references]) => (
          <For each={references}>
            {(reference) => (
              <>
                {/* Line */}
                <Cell text={type} />
                <Cell column={2} text={reference.time} css={sTime} />
              </>
            )}
          </For>
        )}
      </For>
      <Show when={values(props.referenceRecords).flat().length > 0}>
        <HorizontalDivider column={GRID_FULL_COLUMN} thicknessFactor={2} />
      </Show>

      {/* Line */}
      <Cell column={GRID_FULL_COLUMN} text={`Timesheet (${props.timeRecordsSum.trackCount} tracks)`} css={sTitle} />

      {/* Line */}
      <Cell column={GRID_FULL_COLUMN} text={props.timeRecordsSum.time} css={sTime} />
    </GridColumn>
  );
};
