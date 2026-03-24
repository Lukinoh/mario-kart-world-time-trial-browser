import { type Component, For, Match, Show, Switch, createMemo } from "solid-js";
import type { Attempt } from "../schemas/attempt";
import { Cell } from "../../ui/components/grid/cell";
import { GridColumn } from "../../ui/components/grid/grid-column";
import { HorizontalDivider } from "../../ui/components/grid/horizontal-divider";
import { SymbolButton } from "../../ui/components/buttons/symbol-button";
import { VerticalDivider } from "../../ui/components/grid/vertical-divider";
import { cellCss } from "../../ui/css/cell-css";
import { isDefined } from "remeda";

const sValue = cellCss({
  mono: true,
});

const sTitle = cellCss({
  bold: true,
});

const sInfo = cellCss({
  xAlign: "left",
});

interface AttemptsTableProps {
  attempts: Array<Attempt>;
  showTime?: boolean;
  showTrack?: boolean;
  limit?: number;
  onDelete?: (attempt: Attempt) => void;
}

export const AttemptsTable: Component<AttemptsTableProps> = (props) => {
  const GRID_COLUMNS = 18;
  const GRID_SPLITS_COLUMNS = 7;
  const GRID_RESULT_COLUMNS = 3;
  const GRID_SEPARATION_THICKNESS = 2;

  const showTime = createMemo(() => props.showTime ?? true);
  const showTrack = createMemo(() => props.showTrack ?? true);
  const showAction = createMemo(() => Boolean(props.onDelete));
  const gridColumns = createMemo(
    () => GRID_COLUMNS - (Number(!showTime()) + Number(!showTrack()) + 2 * Number(!showAction())),
  );

  const attempts = createMemo(() => props.attempts.slice(0, props.limit));

  return (
    <Switch>
      <Match when={attempts().length}>
        <GridColumn template={`repeat(${gridColumns()}, max-content)`} xAlign="center">
          <For each={attempts()}>
            {(attempt, aIndex) => (
              <>
                <Show when={aIndex() % 7 === 0}>
                  <Cell text="Date" css={[sTitle, sInfo]} />
                  <Show when={showTime()}>
                    <Cell text="Time" css={[sTitle, sInfo]} />
                  </Show>
                  <Cell text="Player" css={[sTitle, sInfo]} />
                  <Show when={showTrack()}>
                    <Cell text="Track" css={[sTitle, sInfo]} />
                  </Show>
                  <VerticalDivider />
                  <Cell text="Split" css={[sTitle]} />
                  <VerticalDivider />
                  <Cell text="⏱️" css={[sTitle]} />
                  <VerticalDivider />
                  <Cell text="️🟡" css={[sTitle]} />
                  <VerticalDivider />
                  <Cell text="🍄" css={[sTitle]} />
                  <VerticalDivider />
                  <Cell text="⏱️" css={[sTitle]} />
                  <VerticalDivider />
                  <Cell text="️🟡" css={[sTitle]} />
                  <Show when={showAction()}>
                    <VerticalDivider />
                    <Cell text="⚙️" />
                  </Show>
                  <HorizontalDivider column={gridColumns()} thicknessFactor={GRID_SEPARATION_THICKNESS} />
                </Show>

                <Cell row={attempt.rowSplits} text={attempt.date} css={[sInfo]} />
                <Show when={showTime()}>
                  <Cell row={attempt.rowSplits} text={attempt.datetime} css={[sInfo]} />
                </Show>
                <Cell row={attempt.rowSplits} text={attempt.raw.player} css={[sInfo]} />
                <Show when={showTrack()}>
                  <Cell row={attempt.rowSplits} text={attempt.raw.track} css={[sInfo]} />
                </Show>
                <VerticalDivider row={attempt.rowSplits} />
                <Switch>
                  <Match when={attempt.splits.length > 0}>
                    <For each={attempt.laps}>
                      {(_, sIndex) => (
                        <>
                          <Switch>
                            <Match when={attempt.splits.at(sIndex())}>
                              {(split) => (
                                <>
                                  <Cell text={`S${_}`} />
                                  <VerticalDivider />
                                  <Cell text={split().raw.time} css={[sValue]} />
                                  <VerticalDivider />
                                  <Cell text={split().raw.coins} css={[sValue]} />
                                  <VerticalDivider />
                                  <Cell text={split().raw.shrooms} css={[sValue]} />
                                  <Show when={sIndex() > 0 && sIndex() < attempt.laps.length - 1}>
                                    <HorizontalDivider column={GRID_SPLITS_COLUMNS} />
                                  </Show>
                                </>
                              )}
                            </Match>
                            <Match when={true}>
                              <Cell column={GRID_SPLITS_COLUMNS} />
                              <Show when={sIndex() > 0 && sIndex() < attempt.laps.length - 1}>
                                <HorizontalDivider column={GRID_SPLITS_COLUMNS} />
                              </Show>
                            </Match>
                          </Switch>
                          <Show when={sIndex() === 0}>
                            <VerticalDivider row={attempt.rowSplits} />
                            <Switch>
                              <Match when={!isDefined(attempt.time) && !isDefined(attempt.coins)}>
                                <Cell column={GRID_RESULT_COLUMNS} row={attempt.rowSplits} />
                              </Match>
                              <Match when>
                                <Cell row={attempt.rowSplits} text={attempt.time} css={[sValue]} />
                                <VerticalDivider row={attempt.rowSplits} />
                                <Cell row={attempt.rowSplits} text={attempt.coins} css={[sValue]} />
                              </Match>
                            </Switch>
                            <Show when={showAction()}>
                              <VerticalDivider row={attempt.rowSplits} />
                              <Cell row={attempt.rowSplits}>
                                <SymbolButton symbol="🗑" onClick={() => props.onDelete?.(attempt)} />
                              </Cell>
                            </Show>
                            <HorizontalDivider column={GRID_SPLITS_COLUMNS} />
                          </Show>
                        </>
                      )}
                    </For>
                  </Match>
                  <Match when={true}>
                    <Cell column={GRID_SPLITS_COLUMNS} row={attempt.rowSplits} text="Not even one split 😭" />
                    <VerticalDivider row={attempt.rowSplits} />
                    <Cell row={attempt.rowSplits} column={GRID_RESULT_COLUMNS} css={[]} />
                    <Show when={showAction()}>
                      <VerticalDivider row={attempt.rowSplits} />
                      <Cell row={attempt.rowSplits}>
                        <SymbolButton symbol="🗑" onClick={() => props.onDelete?.(attempt)} />
                      </Cell>
                    </Show>
                  </Match>
                </Switch>
                <HorizontalDivider column={gridColumns()} thicknessFactor={GRID_SEPARATION_THICKNESS} />
              </>
            )}
          </For>
        </GridColumn>
      </Match>
      <Match when={true}>
        <p>There is no attempts.</p>
      </Match>
    </Switch>
  );
};
