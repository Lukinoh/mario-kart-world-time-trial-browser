import { map, pipe } from "remeda";
import type { AttemptStorage } from "../../storage/schemas/attempt-storage";
import type { Brand } from "../../_core/utils/brand";
import type { SplitStorage } from "../../storage/schemas/split-storage";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
const useBuildAttemptFactory = (laps: number, inputDefaultAttempt?: Partial<AttemptStorage>) => {
  let timestamp = 0;

  const defaultAttempt = {
    player: "Noname",
    track: "A track",
    ...inputDefaultAttempt,
    laps: laps,
  } satisfies Partial<AttemptStorage>;

  const createAttempt = (attempt: Partial<AttemptStorage>): AttemptStorage => {
    timestamp = timestamp + 1;

    return {
      ...defaultAttempt,
      ...attempt,
      timestamp: timestamp,
      splits: attempt.splits ?? [],
    };
  };

  const createSplits = (...time: Array<string>): Array<SplitStorage> => {
    let lap = 0;
    return pipe(
      time,
      map((splitTime) => {
        lap = lap + 1;
        return {
          shrooms: 0,
          coins: 0,
          time: splitTime,
        };
      }),
    );
  };

  return {
    createAttempt,
    createSplit: createSplits,
  };
};

type BuildAttempt = Brand<ReturnType<typeof useBuildAttemptFactory>>;
type BuildAttemptFactory = (...args: Parameters<typeof useBuildAttemptFactory>) => BuildAttempt;
export const useBuildAttempt: BuildAttemptFactory = useBuildAttemptFactory;
