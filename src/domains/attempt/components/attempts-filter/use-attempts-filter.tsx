import { type Accessor, type JSX, createMemo, createSignal } from "solid-js";
import { mapValues, pipe, unique } from "remeda";
import { ALL_TRACKS } from "../../constants";
import type { Attempt } from "../../schemas/attempt";
import { AttemptsFilter as FilterComponent } from "./attempts-filter";

interface UseTrackFilterProps<Input extends Record<string, Accessor<Array<Attempt>>>> {
  input: Input;
}

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
export function useAttemptsFilter<Input extends Record<string, Accessor<Array<Attempt>>>>(
  props: UseTrackFilterProps<Input>,
) {
  const [selectedTrack, setSelectedTrack] = createSignal(ALL_TRACKS);

  // Remeda does not give the correct typings...
  const tracks = createMemo(() => {
    return unique(
      Object.values(props.input)
        .flatMap((attempts) => attempts())
        .map((a) => a.raw.track)
        .toSorted(),
    );
  });

  const filtered = createMemo(() =>
    pipe(
      props.input,
      mapValues((attempts) =>
        attempts().filter((attempt) => attempt.raw.track === selectedTrack() || selectedTrack() === ALL_TRACKS),
      ),
    ),
  );

  const setFilter = (track?: string): void => {
    setSelectedTrack(track ?? ALL_TRACKS);
  };

  const AttemptsFilter = (): JSX.Element => (
    <FilterComponent tracks={tracks()} onTrackSelected={setSelectedTrack} track={selectedTrack()} />
  );

  return {
    AttemptsFilter,
    filtered,
    selectedTrack,
    setFilter,
  };
}
