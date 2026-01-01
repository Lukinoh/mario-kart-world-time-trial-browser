import * as v from "valibot";
import { AttemptStorageSchema } from "../types/attempt-storage";
import { Time } from "../../../recognitions/time/time";
import { format } from "date-and-time";
import { generateArray } from "../../helpers/generate-array";
import { isDefined } from "remeda";

export const AttemptSchema = v.pipe(
  AttemptStorageSchema,
  v.transform((attemptStorage) => {
    const date = format(new Date(attemptStorage.timestamp), "YYYY.MM.DD");
    const datetime = format(new Date(attemptStorage.timestamp), "HH:mm:ss");
    const time = isDefined(attemptStorage.time) ? Time.parse(attemptStorage.time) : undefined;
    const laps = generateArray(attemptStorage.laps);
    const rowSplits = attemptStorage.laps * 2 - 1;

    let accumulatedTime = 0;
    const splits = attemptStorage.splits.map((splitStorage) => {
      const time = Time.parse(splitStorage.time);
      accumulatedTime = accumulatedTime + time;

      return {
        raw: splitStorage,
        time: Time.parse(splitStorage.time),
        accumulatedTime: accumulatedTime,
      };
    });

    return {
      raw: attemptStorage,
      date: date,
      datetime: datetime,
      time: time,
      laps: laps,
      splits: splits,
      rowSplits: rowSplits,
    };
  }),
);

export type Attempt = v.InferOutput<typeof AttemptSchema>;
