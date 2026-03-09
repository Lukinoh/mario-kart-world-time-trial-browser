import * as v from "valibot";
import { type Attempt, AttemptSchema } from "../schemas/attempt";
import {
  drop,
  entries,
  filter,
  firstBy,
  flat,
  flatMap,
  groupBy,
  isDeepEqual,
  last,
  map,
  pipe,
  sortBy,
  sum,
  unique,
  uniqueBy,
  uniqueWith,
  values,
} from "remeda";
import type { AttemptEntity } from "../../database/schemas/attempt-entity";
import type { AttemptsEntity } from "../../database/schemas/attempts-entity";
import type { Brand } from "../../_core/utils/brand";
import type { Store } from "solid-js/store";
import type { SumTimeRecords } from "../types/sum-time-records";
import { Time } from "../utils/time";
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
  getRecordsBy(attempts, (attempt) => attempt.time);

const getRecordsBySplitTime = (attempts: Array<Attempt>, sIndex: number): Array<Attempt> =>
  getRecordsBy(attempts, (attempt) => attempt.splits.at(sIndex)?.time);

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useAttemptsFactory(store: Store<AttemptsEntity>) {
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

  const getTimeRecordsByTrack = (track: string, ignoreFirst?: boolean): Array<Attempt> =>
    pipe(
      attempts(),
      drop(Number(ignoreFirst ?? false)),
      filter((attempt) => attempt.raw.track === track),
      (attempts) => getRecordsByTime(attempts),
    );

  // It returns an array to avoid having to handle the "undefined" case.
  const getSplitRecordByTrack = (track: string, ignoreFirst?: boolean): Array<Attempt> =>
    pipe(
      attempts(),
      drop(Number(ignoreFirst ?? false)),
      filter((attempt) => attempt.raw.track === track),
      (attempts) => {
        const laps = attempts.reduce((maxLaps, attempt) => Math.max(maxLaps, attempt.raw.laps), 0);

        const attemptEntity: AttemptEntity = {
          timestamp: 0,
          player: "Best 🫵🏻 Splits",
          splits: [],
          laps: laps,
          track: track,
        };

        for (let sIndex = 0; sIndex < laps; sIndex = sIndex + 1) {
          // Take the first, this is an arbitrary choice.
          const record = getRecordsBySplitTime(attempts, sIndex).at(0)?.raw;
          const splitRecord = record?.splits.at(sIndex);
          if (record && splitRecord) {
            attemptEntity.splits.push(splitRecord);
            attemptEntity.timestamp = attemptEntity.timestamp + record.timestamp;
          }
        }

        if (attemptEntity.splits.length === 0) {
          return [];
        }

        attemptEntity.timestamp = Math.round(attemptEntity.timestamp / attemptEntity.splits.length);
        return [v.parse(AttemptSchema, attemptEntity)];
      },
    );

  const getSplitRecords = (): Array<Attempt> => {
    return pipe(
      tracks(),
      flatMap((track) => getSplitRecordByTrack(track)),
    );
  };

  const getFlattenRecords = (): Array<AttemptEntity> =>
    pipe(
      attempts(),
      groupBy((attempt) => attempt.raw.track),
      values(),
      flatMap((attempts) => {
        const meaningfullyAttempts: Array<Attempt> = [];
        const laps = attempts.reduce((maxLaps, attempt) => Math.max(maxLaps, attempt.raw.laps), 0);
        meaningfullyAttempts.push(...getRecordsByTime(attempts));

        for (let sIndex = 0; sIndex < laps; sIndex = sIndex + 1) {
          meaningfullyAttempts.push(...getRecordsBySplitTime(attempts, sIndex));
        }

        return meaningfullyAttempts;
      }),
      map((attempt) => attempt.raw),
      uniqueWith(isDeepEqual),
      sortBy((attempt) => -attempt.timestamp),
    );

  const getSumTimeRecords = (): SumTimeRecords => {
    return pipe(
      getTimeRecords(),
      uniqueBy((attempt) => attempt.raw.track),
      map((record) => Time.parse(record.time ?? "0:00.000") - Time.parse("0:00.000")),
      (times) => {
        return {
          time: Time.formatH(Time.parse("0:00.000") + sum(times)),
          trackCount: times.length,
        };
      },
    );
  };

  const merge = (...attempts: Array<Array<AttemptEntity>>): Array<AttemptEntity> => {
    return pipe(
      [store.attempts, ...attempts],
      flat(),
      uniqueWith(isDeepEqual),
      sortBy((attempt) => -attempt.timestamp),
    );
  };

  return {
    attempts,
    lastAttempt,
    tracks,
    getTimeRecords,
    getTimeRecordsByTrack,
    getSplitRecords,
    getSplitRecordByTrack,
    getFlattenRecords,
    getSumTimeRecords,
    merge,
  };
}

type UseAttempts = Brand<ReturnType<typeof useAttemptsFactory>>;
type UseAttemptsFactory = (...args: Parameters<typeof useAttemptsFactory>) => UseAttempts;
export const useAttempts: UseAttemptsFactory = useAttemptsFactory;
