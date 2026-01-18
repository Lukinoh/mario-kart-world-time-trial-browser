import * as v from "valibot";
import { type Attempt, AttemptSchema } from "./attempt";
import { describe, expect, test } from "vitest";
import type { AttemptEntity } from "../../database/schemas/attempt-entity";
import { DateTime } from "../utils/date-time";
import type { SplitEntity } from "../../database/schemas/split-entity";

const parse = (attemptEntity: AttemptEntity): Attempt => {
  return v.parse(AttemptSchema, attemptEntity);
};

const date = new Date();
const timestamp = date.getTime();
const timezoneOffsetMs = date.getTimezoneOffset() * 60 * 1000;

describe("attemptSchema", () => {
  const attemptEntity: AttemptEntity = {
    timestamp: timestamp,
    player: "Noname",
    track: "A track",
    laps: 3,
    splits: [],
  };

  const split_1: SplitEntity = {
    time: "1:00.000",
    shrooms: 1,
    coins: 3,
  };

  const split_2: SplitEntity = {
    time: "1:00.000",
    shrooms: 1,
    coins: -2,
  };

  const split_3: SplitEntity = {
    time: "1:00.000",
    shrooms: 1,
    coins: 1,
  };

  test("parses a basic attempt entity", () => {
    const attempt = parse(attemptEntity);
    expect(attempt.time).toBeUndefined();
    expect(attempt.coins).toBeUndefined();
    expect(attempt.date).toBe(DateTime.formatDate(timestamp));
    expect(attempt.datetime).toBe(DateTime.formatTime(timestamp));
    expect(attempt.laps).toStrictEqual([1, 2, 3]);
    expect(attempt.splits).toHaveLength(0);
    expect(attempt.raw).toStrictEqual(attemptEntity);
  });

  test("parses an attempt entity with one split", () => {
    const attempt = parse({
      ...attemptEntity,
      splits: [split_1],
    });
    expect(attempt.time).toBeUndefined();
    expect(attempt.coins).toBeUndefined();
    expect(attempt.splits.at(0)).toStrictEqual({
      coins: 3,
      accumulatedCoins: 3,
      time: "1:00.000",
      accumulatedTime: "1:00.000",
      parsedTime: 60_000 + timezoneOffsetMs,
      parsedAccumulatedTime: 60_000 + timezoneOffsetMs,
      raw: split_1,
    });
  });

  test("parses an attempt entity with three splits", () => {
    const attempt = parse({
      ...attemptEntity,
      splits: [split_1, split_2, split_3],
    });
    expect(attempt.time).toBe("3:00.000");
    expect(attempt.coins).toBe(2);
    expect(attempt.splits.at(0)).toStrictEqual({
      coins: 3,
      accumulatedCoins: 3,
      time: "1:00.000",
      accumulatedTime: "1:00.000",
      parsedTime: 60_000 + timezoneOffsetMs,
      parsedAccumulatedTime: 60_000 + timezoneOffsetMs,
      raw: split_1,
    });
    expect(attempt.splits.at(1)).toStrictEqual({
      coins: -2,
      accumulatedCoins: 1,
      time: "1:00.000",
      accumulatedTime: "2:00.000",
      parsedTime: 60_000 + timezoneOffsetMs,
      parsedAccumulatedTime: 2 * (60_000 + timezoneOffsetMs),
      raw: split_2,
    });
    expect(attempt.splits.at(2)).toStrictEqual({
      coins: 1,
      accumulatedCoins: 2,
      time: "1:00.000",
      accumulatedTime: "3:00.000",
      parsedTime: 60_000 + timezoneOffsetMs,
      parsedAccumulatedTime: 3 * (60_000 + timezoneOffsetMs),
      raw: split_3,
    });
  });
});
