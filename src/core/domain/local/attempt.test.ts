import * as v from "valibot";
import { type Attempt, AttemptSchema } from "./attempt";
import { describe, expect, test } from "vitest";
import type { AttemptStorage } from "../../../domains/storages/schemas/attempt-storage";
import type { SplitStorage } from "../../../domains/storages/schemas/split-storage";

const parse = (attemptStorage: AttemptStorage): Attempt => {
  return v.parse(AttemptSchema, attemptStorage);
};

describe("attemptSchema", () => {
  const attemptStorage: AttemptStorage = {
    timestamp: 1_767_455_414_145,
    player: "Noname",
    track: "A track",
    laps: 3,
    splits: [],
  };

  const split_1: SplitStorage = {
    time: "1:00.000",
    shrooms: 1,
    coins: 3,
  };

  const split_2: SplitStorage = {
    time: "1:00.000",
    shrooms: 1,
    coins: -2,
  };

  const split_3: SplitStorage = {
    time: "1:00.000",
    shrooms: 1,
    coins: 1,
  };

  test("parses a basic attempt storage", () => {
    const attempt = parse(attemptStorage);
    expect(attempt.time).toBeUndefined();
    expect(attempt.coins).toBeUndefined();
    expect(attempt.date).toBe("2026.01.03");
    expect(attempt.datetime).toBe("16:50:14");
    expect(attempt.laps).toStrictEqual([1, 2, 3]);
    expect(attempt.splits).toHaveLength(0);
    expect(attempt.raw).toStrictEqual(attemptStorage);
  });

  test("parses an attempt storage with one split", () => {
    const attempt = parse({
      ...attemptStorage,
      splits: [split_1],
    });
    expect(attempt.time).toBeUndefined();
    expect(attempt.coins).toBeUndefined();
    expect(attempt.splits.at(0)).toStrictEqual({
      coins: 3,
      accumulatedCoins: 3,
      time: "1:00.000",
      accumulatedTime: "1:00.000",
      parsedTime: -3_540_000,
      parsedAccumulatedTime: -3_540_000,
      raw: split_1,
    });
  });

  test("parses an attempt storage with three splits", () => {
    const attempt = parse({
      ...attemptStorage,
      splits: [split_1, split_2, split_3],
    });
    expect(attempt.time).toBe("3:00.000");
    expect(attempt.coins).toBe(2);
    expect(attempt.splits.at(0)).toStrictEqual({
      coins: 3,
      accumulatedCoins: 3,
      time: "1:00.000",
      accumulatedTime: "1:00.000",
      parsedTime: -3_540_000,
      parsedAccumulatedTime: -3_540_000,
      raw: split_1,
    });
    expect(attempt.splits.at(1)).toStrictEqual({
      coins: -2,
      accumulatedCoins: 1,
      time: "1:00.000",
      accumulatedTime: "2:00.000",
      parsedTime: -3_540_000,
      parsedAccumulatedTime: -7_080_000,
      raw: split_2,
    });
    expect(attempt.splits.at(2)).toStrictEqual({
      coins: 1,
      accumulatedCoins: 2,
      time: "1:00.000",
      accumulatedTime: "3:00.000",
      parsedTime: -3_540_000,
      parsedAccumulatedTime: -10_620_000,
      raw: split_3,
    });
  });
});
