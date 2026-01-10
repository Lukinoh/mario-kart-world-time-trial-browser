import { For, Match, Show, Switch, createEffect, createMemo, createSelector, createSignal } from "solid-js";
import { isDefined, unique } from "remeda";
import type { Attempt } from "../schemas/attempt";
import { Cell } from "../../ui/components/grid/cell";
import { GridColumn } from "../../ui/components/grid/grid-column";
import { HorizontalDivider } from "../../ui/components/grid/horizontal-divider";
import { VerticalDivider } from "../../ui/components/grid/vertical-divider";
import { cellCss } from "../../ui/css/cell-css";
import { defineComponent } from "../../_core/utils/solid-js";
import { targetFromEvent } from "../../_core/utils/event";

const sFirstColumn = cellCss({
  extraPadding: "left",
});

const sLastColumn = cellCss({
  extraPadding: "right",
});

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
  showFilters?: boolean;
  track?: string;
  limit?: number;
  onTrackSelected?: (track: string) => void;
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

  const [selectedTrack, setSelectedTrack] = createSignal<string>(ALL_TRACKS);
  const isSelectedTrack = createSelector(selectedTrack);

  createEffect((): void => {
    setSelectedTrack(props.track ?? ALL_TRACKS);
  });

  const onTrackSelected = (event: Event): void => {
    const track = targetFromEvent(event, HTMLSelectElement).value;
    setSelectedTrack(track);
    props.onTrackSelected?.(track);
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
          <select id="track-filter" onChange={onTrackSelected}>
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
                    <Cell text="Date" css={[sTitle, sInfo, sFirstColumn]} />
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
                    <Cell text="️🟡" css={[sTitle, sLastColumn]} />
                    <HorizontalDivider column={gridColumns()} thicknessFactor={GRID_SEPARATION_THICKNESS} />
                  </Show>

                  <Cell row={attempt.rowSplits} text={attempt.date} css={[sFirstColumn, sInfo]} />
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
                                  <Cell column={GRID_RESULT_COLUMNS} row={attempt.rowSplits} css={[sLastColumn]} />
                                </Match>
                                <Match when>
                                  <Cell row={attempt.rowSplits} text={attempt.time} css={[sValue]} />
                                  <VerticalDivider row={attempt.rowSplits} />
                                  <Cell row={attempt.rowSplits} text={attempt.coins} css={[sValue, sLastColumn]} />
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
                      <Cell row={attempt.rowSplits} column={GRID_RESULT_COLUMNS} css={[sLastColumn]} />
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
