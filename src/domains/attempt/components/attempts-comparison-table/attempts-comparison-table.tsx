import { Cell, type CellProps } from "../../../../components/grid-utilities/cell";
import { For, Show, createMemo } from "solid-js";
import type { Attempt } from "../../schemas/attempt";
import { DeltaCell } from "./delta-cell";
import { F1Cell } from "./f1-cell";
import { GridColumn } from "../../../../components/grid-utilities/grid-column";
import { HorizontalDivider } from "../../../../components/grid-utilities/horizontal-divider";
import type { ReferenceRecords } from "../../types/reference-records";
import { VerticalDivider } from "../../../../components/grid-utilities/vertical-divider";
import { defineComponent } from "../../../../core/helpers/solid-js";
import { delta } from "../../utils/delta";
import { entries } from "remeda";

const aTime: Partial<CellProps> = {
  mono: true,
  xAlign: "right",
};

const aLastColumn: Partial<CellProps> = {
  extraPadding: "right",
};

const aFirstColumn: Partial<CellProps> = {
  xAlign: "left",
  extraPadding: "left",
};

const aTitle: Partial<CellProps> = {
  bold: true,
};

const aType: Partial<CellProps> = {
  xAlign: "center",
  bold: true,
};

interface AttemptsComparisonTableProps {
  last: Attempt;
  referenceRecords: ReferenceRecords;
}

export const AttemptsComparisonTable = defineComponent<AttemptsComparisonTableProps>((props) => {
  const GRID_FULL_ROW = 6;
  const GRID_HALF_ROW = GRID_FULL_ROW / 2;
  const GRID_THIRD_ROW = GRID_FULL_ROW / 3;

  const track = createMemo(() => props.last.raw.track ?? "No track");
  const laps = createMemo(() => props.last.raw.laps ?? 0);
  const gridColumns = createMemo(() => laps() + 6);

  return (
    <GridColumn template={`repeat(${gridColumns()}, max-content)`} xAlign="center" yAlign="center">
      {/*Headers*/}
      <Cell {...aFirstColumn} {...aTitle} column={4} text={track()} />
      <For each={props.last.laps}>{(_, sIndex) => <Cell {...aTitle} text={`Split ${sIndex() + 1}`} />}</For>
      <Cell text="" />
      <Cell {...aLastColumn} text="⏱️" />

      {/* Line 1 */}
      <Cell {...aFirstColumn} row={GRID_HALF_ROW} text={props.last.date} />
      <Cell {...aType} row={GRID_FULL_ROW} text="Last" />
      <VerticalDivider row={GRID_FULL_ROW} />
      <Cell row={GRID_THIRD_ROW} text="️️S" />
      <For each={props.last.laps}>
        {(_, sIndex) => (
          <F1Cell
            {...aTime}
            row={sIndex() === 0 ? GRID_FULL_ROW : GRID_THIRD_ROW}
            attempt={props.last}
            sIndex={sIndex()}
            type="time"
            referencesRecords={props.referenceRecords}
          />
        )}
      </For>
      <VerticalDivider row={GRID_FULL_ROW} />
      <Cell {...aLastColumn} {...aTime} row={GRID_FULL_ROW} text={props.last.time} />

      {/* Line 2 */}
      <HorizontalDivider row={GRID_THIRD_ROW} />
      <HorizontalDivider row={GRID_THIRD_ROW} column={laps() - 1} />

      {/* Line 3 */}
      <Cell {...aFirstColumn} row={GRID_HALF_ROW} text={props.last.datetime} />
      <Cell row={GRID_THIRD_ROW} text="️️ΣS" />
      <For each={props.last.laps}>
        {(_, sIndex) => (
          <Show when={sIndex() > 0}>
            <F1Cell
              {...aTime}
              row={GRID_THIRD_ROW}
              attempt={props.last}
              sIndex={sIndex()}
              type="accumulatedTime"
              referencesRecords={props.referenceRecords}
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
                <Cell {...aFirstColumn} row={GRID_HALF_ROW} text={reference.date} />
                <Cell {...aType} row={GRID_FULL_ROW} text={type} />
                <VerticalDivider row={GRID_FULL_ROW} />
                <Cell row={GRID_THIRD_ROW} text="ΔS" />
                <For each={reference.laps}>
                  {(_, sIndex) => (
                    <DeltaCell
                      {...aTime}
                      row={sIndex() === 0 ? GRID_FULL_ROW : GRID_THIRD_ROW}
                      text={delta(props.last, reference, sIndex(), "time")}
                    />
                  )}
                </For>
                <VerticalDivider row={GRID_FULL_ROW} />
                <Cell {...aLastColumn} {...aTime} row={GRID_FULL_ROW} text={reference.time} />

                {/* Line 2 */}
                <HorizontalDivider row={GRID_THIRD_ROW} />
                <HorizontalDivider row={GRID_THIRD_ROW} column={laps() - 1} />

                {/* Line 3 */}
                <Cell {...aFirstColumn} row={GRID_HALF_ROW} text={reference.raw.player} />
                <Cell row={GRID_THIRD_ROW} text="ΔΣS" />
                <For each={reference.laps}>
                  {(_, sIndex) => (
                    <Show when={sIndex() > 0}>
                      <DeltaCell
                        {...aTime}
                        row={GRID_THIRD_ROW}
                        text={delta(props.last, reference, sIndex(), "accumulatedTime")}
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
});
