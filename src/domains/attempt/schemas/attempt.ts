import * as v from "valibot";
import { AttemptEntitySchema } from "../../database/schemas/attempt-entity";
import { DateTime } from "../utils/date-time";
import { Time } from "../utils/time";
import { generateArray } from "../../_core/utils/generate-array";

export const AttemptSchema = v.pipe(
  AttemptEntitySchema,
  v.transform((attemptEntity) => {
    const date = DateTime.formatDate(attemptEntity.timestamp);
    const datetime = DateTime.formatTime(attemptEntity.timestamp);
    const laps = generateArray(attemptEntity.laps);
    const rowSplits = attemptEntity.laps * 2 - 1;

    let parsedAccumulatedTime = 0;
    let accumulatedCoins = 0;
    const splits = attemptEntity.splits.map((splitEntity) => {
      const parsedTime = Time.parse(splitEntity.time);
      parsedAccumulatedTime = parsedAccumulatedTime + parsedTime;
      accumulatedCoins = accumulatedCoins + splitEntity.coins;

      return {
        raw: splitEntity,
        time: splitEntity.time,
        parsedTime: parsedTime,
        accumulatedTime: Time.format(parsedAccumulatedTime),
        parsedAccumulatedTime: parsedAccumulatedTime,
        coins: splitEntity.coins,
        accumulatedCoins: accumulatedCoins,
      };
    });

    return {
      raw: attemptEntity,
      date: date,
      datetime: datetime,
      coins: splits.at(attemptEntity.laps - 1)?.accumulatedCoins,
      time: splits.at(attemptEntity.laps - 1)?.accumulatedTime,
      laps: laps,
      splits: splits,
      rowSplits: rowSplits,
    };
  }),
);

export type Attempt = v.InferOutput<typeof AttemptSchema>;
