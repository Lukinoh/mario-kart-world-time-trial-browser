import { For, Match, Show, Switch, createMemo, createSelector, createSignal } from "solid-js";
import { isDefined, unique } from "remeda";
import type { Attempt } from "../../core/domain/local/attempt";
import { Cell } from "../grid-utilities/cell";
import { GridColumn } from "../grid-utilities/grid-column";
import { HorizontalDivider } from "../grid-utilities/horizontal-divider";
import { VerticalDivider } from "../grid-utilities/vertical-divider";
import { defineComponent } from "../../core/helpers/solid-js";

interface AttemptsTableProps {
  attempts: Array<Attempt>;
  showTime?: boolean;
  showFilters?: boolean;
  defaultTrack?: string;
}

export const AttemptsTable = defineComponent<AttemptsTableProps>((props) => {
  const GRID_COLUMNS = 16;
  const GRID_SPLITS_COLUMNS = 7;
  const GRID_RESULT_COLUMNS = 3;
  const GRID_SEPARATION_THICKNESS = 2;
  const ALL_TRACKS = "All tracks";

  const showTime = createMemo(() => props.showTime ?? true);
  const showFilters = createMemo(() => props.showFilters ?? true);
  const gridColumns = createMemo(() => GRID_COLUMNS - Number(!showTime()));

  const [selectedTrack, setSelectedTrack] = createSignal();
  const isSelectedTrack = createSelector(
    selectedTrack,
    (a, selectedTrack) => a === (selectedTrack ?? props.defaultTrack ?? ALL_TRACKS),
  );
  const tracks = createMemo(() => [
    ALL_TRACKS,
    ...unique(props.attempts.map((attempt) => attempt.raw.track)).toSorted(),
  ]);

  const attempts = createMemo(() =>
    props.attempts.filter((attempt) => isSelectedTrack(attempt.raw.track) || isSelectedTrack(ALL_TRACKS)),
  );

  return (
    <>
      <Show when={showFilters()}>
        <>
          <label for="track-filter">Filter by</label>
          <select id="track-filter" onchange={(event) => setSelectedTrack(event.target.value)}>
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
      <GridColumn template={`repeat(${gridColumns()}, max-content)`} xAlign="center">
        <For each={attempts()}>
          {(attempt, aIndex) => (
            <>
              <Show when={aIndex() % 7 === 0}>
                <Cell bold xAlign="left" text="Date" extraPadding="left" />
                <Show when={showTime()}>
                  <Cell bold xAlign="left" text="Time" />
                </Show>
                <Cell bold xAlign="left" text="Player" />
                <Cell bold xAlign="left" text="Track" />
                <VerticalDivider />
                <Cell bold text="Split" />
                <VerticalDivider />
                <Cell bold text="⏱️" />
                <VerticalDivider />
                <Cell bold text="️🟡" />
                <VerticalDivider />
                <Cell bold text="🍄" />
                <VerticalDivider />
                <Cell bold text="⏱️" />
                <VerticalDivider />
                <Cell bold text="️🟡" extraPadding="right" />
                <HorizontalDivider column={gridColumns()} thicknessFactor={GRID_SEPARATION_THICKNESS} />
              </Show>

              <Cell xAlign="left" row={attempt.rowSplits} text={attempt.date} extraPadding="left" />
              <Show when={showTime()}>
                <Cell xAlign="left" row={attempt.rowSplits} text={attempt.datetime} />
              </Show>
              <Cell xAlign="left" row={attempt.rowSplits} text={attempt.raw.player} />
              <Cell xAlign="left" row={attempt.rowSplits} text={attempt.raw.track} />
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
                                <Cell mono text={split().raw.time} />
                                <VerticalDivider />
                                <Cell mono text={split().raw.coins} />
                                <VerticalDivider />
                                <Cell mono text={split().raw.shrooms} />
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
                            <Match when={!isDefined(attempt.raw.time) && !isDefined(attempt.raw.coins)}>
                              <Cell column={GRID_RESULT_COLUMNS} row={attempt.rowSplits} extraPadding="right" />
                            </Match>
                            <Match when>
                              <Cell mono row={attempt.rowSplits} text={attempt.raw.time} />
                              <VerticalDivider row={attempt.rowSplits} />
                              <Cell mono row={attempt.rowSplits} text={attempt.raw.coins} extraPadding="right" />
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
                  <Cell row={attempt.rowSplits} column={GRID_RESULT_COLUMNS} extraPadding="right" />
                </Match>
              </Switch>
              <HorizontalDivider column={gridColumns()} thicknessFactor={GRID_SEPARATION_THICKNESS} />
            </>
          )}
        </For>
      </GridColumn>
    </>
  );
});
