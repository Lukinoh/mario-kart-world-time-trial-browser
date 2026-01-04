import { Cell, type CellProps } from "../grid-utilities/cell";
import { For, type JSX, Match, Show, Switch, createMemo, createSelector, createSignal } from "solid-js";
import { isDefined, unique } from "remeda";
import type { Attempt } from "../../core/domain/local/attempt";
import { GridColumn } from "../grid-utilities/grid-column";
import { HorizontalDivider } from "../grid-utilities/horizontal-divider";
import { VerticalDivider } from "../grid-utilities/vertical-divider";
import { defineComponent } from "../../core/helpers/solid-js";

const aFirstColumn: Partial<CellProps> = {
  extraPadding: "left",
};

const aLastColumn: Partial<CellProps> = {
  extraPadding: "right",
};

const aValue: Partial<CellProps> = {
  mono: true,
};

const aTitle: Partial<CellProps> = {
  bold: true,
};

const aInfo: Partial<CellProps> = {
  xAlign: "left",
};

interface AttemptsTableProps {
  attempts: Array<Attempt>;
  showTime?: boolean;
  showTrack?: boolean;
  showFilters?: boolean;
  defaultTrack?: string;
  limit?: number;
  onSelectedTrack?: (track: string) => void;
}

export const AttemptsTable = defineComponent<AttemptsTableProps>((props) => {
  const GRID_COLUMNS = 16;
  const GRID_SPLITS_COLUMNS = 7;
  const GRID_RESULT_COLUMNS = 3;
  const GRID_SEPARATION_THICKNESS = 2;
  const ALL_TRACKS = "All tracks";

  const showTime = createMemo(() => props.showTime ?? true);
  const showTrack = createMemo(() => props.showTrack ?? true);
  const showFilters = createMemo(() => props.showFilters ?? true);
  const gridColumns = createMemo(() => GRID_COLUMNS - (Number(!showTime()) + Number(!showTrack())));

  const [selectedTrack, setSelectedTrack] = createSignal<string>();
  const isSelectedTrack = createSelector(
    selectedTrack,
    (a, selectedTrack) => a === (selectedTrack ?? props.defaultTrack ?? ALL_TRACKS),
  );
  const onSelectedTrack: JSX.ChangeEventHandler<HTMLSelectElement, Event> = (event) => {
    const track = event.target.value;
    setSelectedTrack(track);
    props.onSelectedTrack?.(track);
  };

  const tracks = createMemo(() => [
    ALL_TRACKS,
    ...unique(props.attempts.map((attempt) => attempt.raw.track)).toSorted(),
  ]);

  const attempts = createMemo(() =>
    props.attempts
      .filter((attempt) => isSelectedTrack(attempt.raw.track) || isSelectedTrack(ALL_TRACKS))
      .slice(0, props.limit),
  );

  return (
    <>
      <Show when={showFilters()}>
        <>
          <label for="track-filter">Filter by</label>
          <select id="track-filter" onchange={onSelectedTrack}>
            <For each={tracks()}>
              {(track) => (
                <option selected={isSelectedTrack(track)} value={track}>
                  {track}
                </option>
              )}
            </For>
          </select>
        </>
      </Show>
      <Switch>
        <Match when={attempts().length}>
          <GridColumn template={`repeat(${gridColumns()}, max-content)`} xAlign="center">
            <For each={attempts()}>
              {(attempt, aIndex) => (
                <>
                  <Show when={aIndex() % 7 === 0}>
                    <Cell {...aTitle} {...aFirstColumn} {...aInfo} text="Date" />
                    <Show when={showTime()}>
                      <Cell {...aTitle} {...aInfo} text="Time" />
                    </Show>
                    <Cell {...aTitle} {...aInfo} text="Player" />
                    <Show when={showTrack()}>
                      <Cell {...aTitle} {...aInfo} text="Track" />
                    </Show>
                    <VerticalDivider />
                    <Cell {...aTitle} text="Split" />
                    <VerticalDivider />
                    <Cell {...aTitle} text="⏱️" />
                    <VerticalDivider />
                    <Cell {...aTitle} text="️🟡" />
                    <VerticalDivider />
                    <Cell {...aTitle} text="🍄" />
                    <VerticalDivider />
                    <Cell {...aTitle} text="⏱️" />
                    <VerticalDivider />
                    <Cell {...aTitle} {...aLastColumn} text="️🟡" />
                    <HorizontalDivider column={gridColumns()} thicknessFactor={GRID_SEPARATION_THICKNESS} />
                  </Show>

                  <Cell {...aFirstColumn} {...aInfo} row={attempt.rowSplits} text={attempt.date} />
                  <Show when={showTime()}>
                    <Cell {...aInfo} row={attempt.rowSplits} text={attempt.datetime} />
                  </Show>
                  <Cell {...aInfo} row={attempt.rowSplits} text={attempt.raw.player} />
                  <Show when={showTrack()}>
                    <Cell {...aInfo} row={attempt.rowSplits} text={attempt.raw.track} />
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
                                    <Cell {...aValue} text={split().raw.time} />
                                    <VerticalDivider />
                                    <Cell {...aValue} text={split().raw.coins} />
                                    <VerticalDivider />
                                    <Cell {...aValue} text={split().raw.shrooms} />
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
                                  <Cell {...aLastColumn} column={GRID_RESULT_COLUMNS} row={attempt.rowSplits} />
                                </Match>
                                <Match when>
                                  <Cell {...aValue} row={attempt.rowSplits} text={attempt.time} />
                                  <VerticalDivider row={attempt.rowSplits} />
                                  <Cell {...aLastColumn} {...aValue} row={attempt.rowSplits} text={attempt.coins} />
                                </Match>
                              </Switch>
                              <HorizontalDivider column={GRID_SPLITS_COLUMNS} />
                            </Show>
                          </>
                        )}
                      </For>
                    </Match>
                    <Match when={true}>
                      <Cell column={GRID_SPLITS_COLUMNS} row={attempt.rowSplits} text="Not even one split 😭" />
                      <VerticalDivider row={attempt.rowSplits} />
                      <Cell {...aLastColumn} row={attempt.rowSplits} column={GRID_RESULT_COLUMNS} />
                    </Match>
                  </Switch>
                  <HorizontalDivider column={gridColumns()} thicknessFactor={GRID_SEPARATION_THICKNESS} />
                </>
              )}
            </For>
          </GridColumn>
        </Match>
        <Match when={true}>
          <p>There is no attempts{!isSelectedTrack(ALL_TRACKS) && "on this track "}.</p>
        </Match>
      </Switch>
    </>
  );
});
