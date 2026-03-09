import { type Component, For, createEffect, createMemo, createSelector, createSignal } from "solid-js";
import { ALL_TRACKS } from "../../constants";
import { targetFromEvent } from "../../../_core/utils/event";

interface AttemptFilterProps {
  track?: string;
  tracks: Array<string>;
  onTrackSelected?: (track: string) => void;
}

export const AttemptsFilter: Component<AttemptFilterProps> = (props) => {
  const [selectedTrack, setSelectedTrack] = createSignal(ALL_TRACKS);
  const isSelectedTrack = createSelector(selectedTrack);

  createEffect((): void => {
    setSelectedTrack(props.track ?? ALL_TRACKS);
  });

  const onTrackSelected = (event: Event): void => {
    const track = targetFromEvent(event, HTMLSelectElement).value;
    setSelectedTrack(track);
    props.onTrackSelected?.(track);
  };

  const tracks = createMemo(() => [ALL_TRACKS, ...props.tracks]);

  const displayTrackCount = (track: string): string | undefined => {
    if (track === ALL_TRACKS) {
      return `(${tracks().length - 1})`;
    }
  };

  return (
    <div>
      <label for="track-filter">Filter by</label>
      <select id="track-filter" onChange={onTrackSelected}>
        <For each={tracks()}>
          {(track) => (
            <option selected={isSelectedTrack(track)} value={track}>
              {track} {displayTrackCount(track)}
            </option>
          )}
        </For>
      </select>
    </div>
  );
};
