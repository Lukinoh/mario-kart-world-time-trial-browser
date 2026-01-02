import * as v from "valibot";
import { type Attempt, AttemptSchema } from "../../core/domain/local/attempt";
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
import type { AttemptStorage } from "../../core/domain/types/attempt-storage";
import type { AttemptsStorage } from "../../core/domain/types/attempts-storage";
import type { Brand } from "../../core/helpers/brand";
import type { Store } from "solid-js/store";
import { Time } from "../../recognitions/time/time";
import { createMemo } from "solid-js";

function getRecordsBy<T extends Attempt>(attempts: Array<T>, by: Parameters<typeof groupBy<T>>[0]): Array<T> {
  return pipe(
    attempts,
    groupBy(by),
    entries(),
    firstBy(([value]) => value),
    (best) => best ?? [],
    last(),
    (result) => result ?? [],
  );
}

const getRecordsByTime = (attempts: Array<Attempt>): Array<Attempt> =>
  getRecordsBy(attempts, (attempt) => attempt.raw.time);

const getRecordsBySplitTime = (attempts: Array<Attempt>, split: number): Array<Attempt> =>
  getRecordsBy(attempts, (attempt) => attempt.splits.at(split - 1)?.raw.time);

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useAttemptsFactory(store: Store<AttemptsStorage>) {
  const attempts = createMemo(() => store.attempts.map((attempt) => v.parse(AttemptSchema, attempt)));
  const lastAttempt = createMemo(() => attempts().at(0));
  const tracks = createMemo(() =>
    pipe(
      attempts(),
      map((attempt) => attempt.raw.track),
      unique(),
      sortBy(String),
    ),
  );

  const getTimeRecords = (): Array<Attempt> =>
    pipe(
      attempts(),
      groupBy((attempt) => attempt.raw.track),
      values(),
      flatMap((attempts) => getRecordsByTime(attempts)),
    );

  const getTimeRecordsByTrack = (track: string): Array<Attempt> =>
    pipe(
      attempts(),
      filter((attempt) => attempt.raw.track === track),
      (attempts) => getRecordsByTime(attempts),
    );

  const getSplitRecordByTrack = (track: string): Array<Attempt> =>
    pipe(
      attempts(),
      filter((attempt) => attempt.raw.track === track),
      (attempts) => {
        const laps = reduce(attempts, (maxLaps, attempt) => Math.max(maxLaps, attempt.raw.laps), 0);

        const attemptStorage: AttemptStorage = {
          timestamp: 0,
          player: "Best 🫵🏻 Splits",
          splits: [],
          laps: laps,
          track: track,
        };

        for (let sIndex = 0; sIndex < laps; sIndex = sIndex + 1) {
          // Take the first, this is an arbitrary choice.
          const record = getRecordsBySplitTime(attempts, sIndex + 1).at(0)?.raw;
          const splitRecord = record?.splits.at(sIndex);
          if (record && splitRecord) {
            attemptStorage.splits.push(splitRecord);
            attemptStorage.timestamp = attemptStorage.timestamp + record.timestamp;
          }
        }

        attemptStorage.coins = attemptStorage.splits.reduce((acc, split) => acc + split.coins, 0);
        attemptStorage.time = Time.format(
          attemptStorage.splits.reduce((acc, split) => acc + Time.parse(split.time), 0),
        );
        attemptStorage.timestamp = Math.round(attemptStorage.timestamp / 3);

        if (attemptStorage.splits.length === 0) {
          return [];
        }

        return [v.parse(AttemptSchema, attemptStorage)];
      },
    );

  const getFlattenRecords = (): Array<AttemptStorage> =>
    pipe(
      attempts(),
      groupBy((attempt) => attempt.raw.track),
      values(),
      flatMap((attempts) => {
        const meaningfullyAttempts: Array<Attempt> = [];
        const laps = reduce(attempts, (maxLaps, attempt) => Math.max(maxLaps, attempt.raw.laps), 0);
        meaningfullyAttempts.push(...getRecordsByTime(attempts));

        for (let split = 1; split <= laps; split = split + 1) {
          meaningfullyAttempts.push(...getRecordsBySplitTime(attempts, split));
        }

        return meaningfullyAttempts;
      }),
      map((attempt) => attempt.raw),
      uniqueWith(isDeepEqual),
      sortBy((attempt) => attempt.timestamp),
    );

  return {
    attempts,
    lastAttempt,
    tracks,
    getTimeRecords,
    getTimeRecordsByTrack,
    getSplitRecordByTrack,
    getFlattenRecords,
  };
}

type UseAttempts = Brand<ReturnType<typeof useAttemptsFactory>>;
type UseAttemptsFactory = (...args: Parameters<typeof useAttemptsFactory>) => UseAttempts;
export const useAttempts: UseAttemptsFactory = useAttemptsFactory;
