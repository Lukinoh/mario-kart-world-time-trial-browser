import * as v from "valibot";
import { AttemptStorageSchema } from "../../storages/schemas/attempt-storage";
import { Time } from "../../recognitions/time/time";
import { format } from "date-and-time";
import { generateArray } from "../../../core/helpers/generate-array";

export const AttemptSchema = v.pipe(
  AttemptStorageSchema,
  v.transform((attemptStorage) => {
    const date = format(new Date(attemptStorage.timestamp), "YYYY.MM.DD");
    const datetime = format(new Date(attemptStorage.timestamp), "HH:mm:ss");
    const laps = generateArray(attemptStorage.laps);
    const rowSplits = attemptStorage.laps * 2 - 1;

    let parsedAccumulatedTime = 0;
    let accumulatedCoins = 0;
    const splits = attemptStorage.splits.map((splitStorage) => {
      const parsedTime = Time.parse(splitStorage.time);
      parsedAccumulatedTime = parsedAccumulatedTime + parsedTime;
      accumulatedCoins = accumulatedCoins + splitStorage.coins;

      return {
        raw: splitStorage,
        time: splitStorage.time,
        parsedTime: parsedTime,
        accumulatedTime: Time.format(parsedAccumulatedTime),
        parsedAccumulatedTime: parsedAccumulatedTime,
        coins: splitStorage.coins,
        accumulatedCoins: accumulatedCoins,
      };
    });

    return {
      raw: attemptStorage,
      date: date,
      datetime: datetime,
      coins: splits.at(attemptStorage.laps - 1)?.accumulatedCoins,
      time: splits.at(attemptStorage.laps - 1)?.accumulatedTime,
      laps: laps,
      splits: splits,
      rowSplits: rowSplits,
    };
  }),
);

export type Attempt = v.InferOutput<typeof AttemptSchema>;
