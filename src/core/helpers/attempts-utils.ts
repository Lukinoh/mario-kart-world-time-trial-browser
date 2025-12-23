import {
  entries,
  filter,
  firstBy,
  flat,
  groupBy,
  groupByProp,
  isDeepEqual,
  last,
  map,
  mapValues,
  pipe,
  reduce,
  sortBy,
  uniqueWith,
  values,
} from "remeda";
import type { Attempt } from "../domain/types/attempt";
import type { Brand } from "./brand";

function getRecordsBy<T extends Attempt>(
  attempts: Array<T>,
  by: Parameters<typeof groupBy<T>>[0],
): Array<T> | undefined {
  return pipe(
    attempts,
    groupBy(by),
    entries(),
    firstBy(([time]) => time),
    (best) => best ?? [],
    last(),
  );
}

type Track = Brand<string>;

function getRecords(attempts: Array<Attempt>): Partial<Record<Track, Array<Attempt>>> {
  return pipe(
    attempts,
    groupByProp("track"),
    mapValues((attempts) => getRecordsBy(attempts, (attempt) => attempt.time)),
  );
}

function getData(
  attempts: Array<Attempt>,
): Partial<Record<Track, Partial<Record<"records" | `split_${number}`, Array<Attempt>>>>> {
  return pipe(
    attempts,
    groupByProp("track"),
    mapValues((attempts) => {
      const laps = reduce(attempts, (maxLap, attempt) => Math.max(maxLap, attempt.laps), 0);

      const data: Partial<Record<"records" | `split_${number}`, Array<Attempt>>> = {};

      // We do not want to have an entry with value undefined if there is no records
      const records = getRecordsBy(attempts, (attempt) => attempt.time);
      if (records) {
        data.records = records;
      }
      for (let index = 0; index < laps; index = index + 1) {
        data[`split_${index + 1}`] = getRecordsBy(attempts, (attempt) => attempt.splits.at(index)?.time);
      }

      return data;
    }),
  );
}

function flattenRecords(
  data: Partial<Record<Track, Partial<Record<"records" | `split_${number}`, Array<Attempt>>>>>,
): Array<Attempt> {
  return pipe(
    data,
    values(),
    map((byTrack) => values(byTrack ?? {})),
    flat(10),
    uniqueWith(isDeepEqual),
    filter((attempt) => attempt !== undefined),
    sortBy((attempt) => attempt.timestamp),
  );
}

export const AttemptsUtils = {
  getData,
  getRecords,
  flattenRecords,
};
