import {
  entries,
  filter,
  firstBy,
  flatMap,
  groupBy,
  isDeepEqual,
  last,
  map,
  pipe,
  reduce,
  sortBy,
  unique,
  uniqueWith,
  values,
} from "remeda";
import type { Attempt } from "../../core/domain/types/attempt";
import type { AttemptsStorage } from "../../core/domain/types/attempts-storage";
import type { Brand } from "../../core/helpers/brand";
import type { Store } from "solid-js/store";
import { createMemo } from "solid-js";

function getRecordsBy<T extends Attempt>(attempts: Array<T>, by: Parameters<typeof groupBy<T>>[0]): Array<T> {
  return pipe(
    attempts,
    groupBy(by),
    entries(),
    firstBy(([time]) => time),
    (best) => best ?? [],
    last(),
    (result) => result ?? [],
  );
}

const getRecordsByTime = (attempts: Array<Attempt>): Array<Attempt> =>
  getRecordsBy(attempts, (attempt) => attempt.time);

const getRecordsBySplitTime = (attempts: Array<Attempt>, split: number): Array<Attempt> =>
  getRecordsBy(attempts, (attempt) => attempt.splits.at(split - 1)?.time);
// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useAttemptsFactory(store: Store<AttemptsStorage>) {
  const attempts = createMemo(() => store.attempts);
  const lastAttempt = createMemo(() => attempts().at(0));
  const tracks = createMemo(() =>
    pipe(
      attempts(),
      map((attempt) => attempt.track),
      unique(),
      sortBy(String),
    ),
  );

  const getTimeRecords = (): Array<Attempt> =>
    pipe(
      attempts(),
      groupBy((attempt) => attempt.track),
      values(),
      flatMap((attempts) => getRecordsByTime(attempts)),
    );

  const getTimeRecordsByTrack = (track: string): Array<Attempt> =>
    pipe(
      attempts(),
      filter((attempt) => attempt.track === track),
      (attempts) => getRecordsByTime(attempts),
    );

  const getSplitRecordsByTrack = (track: string, split: number): Array<Attempt> =>
    pipe(
      attempts(),
      filter((attempt) => attempt.track === track),
      (attempts) => getRecordsBySplitTime(attempts, split),
    );

  const getFlattenRecords = (): Array<Attempt> =>
    pipe(
      attempts(),
      groupBy((attempt) => attempt.track),
      values(),
      flatMap((attempts) => {
        const meaningfullyAttempts: Array<Attempt> = [];
        const laps = reduce(attempts, (maxLaps, attempt) => Math.max(maxLaps, attempt.laps), 0);
        meaningfullyAttempts.push(...getRecordsByTime(attempts));

        for (let split = 1; split <= laps; split = split + 1) {
          meaningfullyAttempts.push(...getRecordsBySplitTime(attempts, split));
        }

        return meaningfullyAttempts;
      }),
      uniqueWith(isDeepEqual),
      sortBy((attempt) => attempt.timestamp),
    );

  return {
    attempts,
    lastAttempt,
    tracks,
    getTimeRecords,
    getTimeRecordsByTrack,
    getSplitRecordsByTrack,
    getFlattenRecords,
  };
}

type UseAttempts = Brand<ReturnType<typeof useAttemptsFactory>>;
type UseAttemptsFactory = (...args: Parameters<typeof useAttemptsFactory>) => UseAttempts;
export const useAttempts: UseAttemptsFactory = useAttemptsFactory;
