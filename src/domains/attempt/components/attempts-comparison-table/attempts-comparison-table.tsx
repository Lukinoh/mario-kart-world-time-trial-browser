import { type Component, For, Show, createMemo } from "solid-js";
import type { Attempt } from "../../schemas/attempt";
import { Cell } from "../../../ui/components/grid/cell";
import { DeltaCell } from "./delta-cell";
import { F1Cell } from "./f1-cell";
import { GridColumn } from "../../../ui/components/grid/grid-column";
import { HorizontalDivider } from "../../../ui/components/grid/horizontal-divider";
import type { ReferenceRecords } from "../../types/reference-records";
import { TimeWidthCell } from "./time-width-cell";
import { VerticalDivider } from "../../../ui/components/grid/vertical-divider";
import { cellCss } from "../../../ui/css/cell-css";
import { delta } from "../../utils/delta";
import { entries } from "remeda";

const sTime = cellCss({
  mono: true,
  xAlign: "right",
});

const sLastColumn = cellCss({
  extraPadding: "right",
});

const sFirstColumn = cellCss({
  xAlign: "left",
  extraPadding: "left",
});

const sTitle = cellCss({
  bold: true,
});

const sType = cellCss({
  xAlign: "center",
  bold: true,
});

interface AttemptsComparisonTableProps {
  last: Attempt;
  referenceRecords: ReferenceRecords;
}

export const AttemptsComparisonTable: Component<AttemptsComparisonTableProps> = (props) => {
  const GRID_FULL_ROW = 6;
  const GRID_HALF_ROW = GRID_FULL_ROW / 2;
  const GRID_THIRD_ROW = GRID_FULL_ROW / 3;

  const track = createMemo(() => props.last.raw.track ?? "No track");
  const laps = createMemo(() => props.last.raw.laps ?? 0);
  const gridColumns = createMemo(() => laps() + 6);

  return (
    <GridColumn template={`repeat(${gridColumns()}, max-content)`} xAlign="center" yAlign="center">
      {/*Headers*/}
      <Cell column={4} text={track()} css={[sTitle, sFirstColumn]} />
      <For each={props.last.laps}>{(_, sIndex) => <TimeWidthCell text={`Split ${sIndex() + 1}`} css={[sTitle]} />}</For>
      <Cell text="" />
      <TimeWidthCell text="⏱️" css={[sLastColumn]} />

      {/* Line 1 */}
      <Cell row={GRID_HALF_ROW} text={props.last.date} css={[sFirstColumn]} />
      <Cell row={GRID_FULL_ROW} text="Last" css={[sType]} />
      <VerticalDivider row={GRID_FULL_ROW} />
      <Cell row={GRID_THIRD_ROW} text="️️S" />
      <For each={props.last.laps}>
        {(_, sIndex) => (
          <F1Cell
            row={sIndex() === 0 ? GRID_FULL_ROW : GRID_THIRD_ROW}
            attempt={props.last}
            sIndex={sIndex()}
            type="time"
            referencesRecords={props.referenceRecords}
            css={[sTime]}
          />
        )}
      </For>
      <VerticalDivider row={GRID_FULL_ROW} />
      <Cell row={GRID_FULL_ROW} text={props.last.time} css={[sTime, sLastColumn]} />

      {/* Line 2 */}
      <HorizontalDivider row={GRID_THIRD_ROW} />
      <HorizontalDivider row={GRID_THIRD_ROW} column={laps() - 1} />

      {/* Line 3 */}
      <Cell row={GRID_HALF_ROW} text={props.last.datetime} css={[sFirstColumn]} />
      <Cell row={GRID_THIRD_ROW} text="️️ΣS" />
      <For each={props.last.laps}>
        {(_, sIndex) => (
          <Show when={sIndex() > 0}>
            <F1Cell
              row={GRID_THIRD_ROW}
              attempt={props.last}
              sIndex={sIndex()}
              type="accumulatedTime"
              referencesRecords={props.referenceRecords}
              css={[sTime]}
            />
          </Show>
        )}
      </For>

      <HorizontalDivider column={gridColumns()} thicknessFactor={2} />

      <For each={entries(props.referenceRecords)}>
        {([type, references]) => (
          <For each={references}>
            {(reference) => (
              <>
                {/* Line 1 */}
                <Cell row={GRID_HALF_ROW} text={reference.date} css={[sFirstColumn]} />
                <Cell row={GRID_FULL_ROW} text={type} css={[sType]} />
                <VerticalDivider row={GRID_FULL_ROW} />
                <Cell row={GRID_THIRD_ROW} text="ΔS" />
                <For each={reference.laps}>
                  {(_, sIndex) => (
                    <DeltaCell
                      row={sIndex() === 0 ? GRID_FULL_ROW : GRID_THIRD_ROW}
                      text={delta(props.last, reference, sIndex(), "time")}
                      css={[sTime]}
                    />
                  )}
                </For>
                <VerticalDivider row={GRID_FULL_ROW} />
                <Cell row={GRID_FULL_ROW} text={reference.time} css={[sTime, sLastColumn]} />

                {/* Line 2 */}
                <HorizontalDivider row={GRID_THIRD_ROW} />
                <HorizontalDivider row={GRID_THIRD_ROW} column={laps() - 1} />

                {/* Line 3 */}
                <Cell row={GRID_HALF_ROW} text={reference.raw.player} css={[sFirstColumn]} />
                <Cell row={GRID_THIRD_ROW} text="ΔΣS" />
                <For each={reference.laps}>
                  {(_, sIndex) => (
                    <Show when={sIndex() > 0}>
                      <DeltaCell
                        row={GRID_THIRD_ROW}
                        text={delta(props.last, reference, sIndex(), "accumulatedTime")}
                        css={[sTime]}
                      />
                    </Show>
                  )}
                </For>

                {/* Line 4 */}
                <HorizontalDivider column={gridColumns()} thicknessFactor={2} />
              </>
            )}
          </For>
        )}
      </For>
    </GridColumn>
  );
};
