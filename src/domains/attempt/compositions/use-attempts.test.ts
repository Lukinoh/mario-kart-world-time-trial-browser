import { describe, expect, test } from "vitest";
import type { AttemptEntity } from "../../database/schemas/attempt-entity";
import { createRoot } from "solid-js";
import { toEntities } from "../../test/utils/to-entities";
import { useAttempts } from "./use-attempts";
import { useBuildAttempt } from "../../test/compositions/use-build-attempt";

describe("attempts", () => {
  test("returns the lists of attempts", () => {
    const input: Array<AttemptEntity> = [];
    const { attempts } = createRoot(() => useAttempts({ version: 1, attempts: input }));
    expect(attempts()).toStrictEqual(input);
  });
});

describe("tracks", () => {
  test("returns an empty array if there is no attempts", () => {
    const { tracks } = createRoot(() => useAttempts({ version: 1, attempts: [] }));
    expect(tracks()).toStrictEqual([]);
  });

  test("returns the list of tracks in alphabetic order", () => {
    const { createAttempt } = useBuildAttempt(0);
    const { tracks } = createRoot(() =>
      useAttempts({
        version: 1,
        attempts: [
          createAttempt({ track: "D" }),
          createAttempt({ track: "A" }),
          createAttempt({ track: "D" }),
          createAttempt({ track: "C" }),
          createAttempt({ track: "A" }),
          createAttempt({ track: "B" }),
        ],
      }),
    );
    expect(tracks()).toStrictEqual(["A", "B", "C", "D"]);
  });
});

describe("lastAttempt", () => {
  test("returns undefined if there is no last attempt", () => {
    const { lastAttempt } = createRoot(() => useAttempts({ version: 1, attempts: [] }));
    expect(lastAttempt()).toBeUndefined();
  });

  test("returns the last attempt", () => {
    const { createAttempt } = useBuildAttempt(0);

    // The attempts are stored from more recent to older.
    const { lastAttempt } = createRoot(() =>
      useAttempts({
        version: 1,
        attempts: [
          createAttempt({ player: "Last Attempt" }),
          createAttempt({ player: "Attempt Before Last Attempt" }),
          createAttempt({ player: "Attempt Before Before Last Attempt" }),
        ],
      }),
    );
    expect(lastAttempt()?.raw.player).toBe("Last Attempt");
  });
});

describe("getTimeRecords", () => {
  test("returns an empty array if no time records is found", () => {
    const { getTimeRecords } = createRoot(() => useAttempts({ version: 1, attempts: [] }));
    expect(getTimeRecords()).toStrictEqual([]);
  });

  test("returns the time records for each track ordered", () => {
    const { createAttempt, createSplit } = useBuildAttempt(2);
    const recordAttempt_A = createAttempt({ track: "A", splits: createSplit("1:00.000", "2:00.000") });
    const recordAttempt_B = createAttempt({ track: "B", splits: createSplit("0:30.000", "0:30.000") });

    const { getTimeRecords } = createRoot(() =>
      useAttempts({
        version: 1,
        attempts: [
          recordAttempt_A,
          createAttempt({ track: "B", splits: createSplit("4:00.000", "4:00.000") }),
          createAttempt({ track: "A", splits: createSplit("2:00.000", "3:00.000") }),
          createAttempt({ track: "B", splits: createSplit("2:00.000", "2:00.000") }),
          createAttempt({ track: "A", splits: createSplit("3:00.000", "4:00.000") }),
          recordAttempt_B,
        ],
      }),
    );

    const timeRecords = toEntities(getTimeRecords());
    expect(timeRecords).toStrictEqual([recordAttempt_A, recordAttempt_B]);
  });

  test("returns two time records if same time, but not same attempt", () => {
    const { createAttempt, createSplit } = useBuildAttempt(1);
    const attemptOne = createAttempt({ player: "Attempt One", splits: createSplit("1:00.000") });
    const attemptTwo = createAttempt({ player: "Attempt Two", splits: createSplit("1:00.000") });

    const { getTimeRecords } = createRoot(() => useAttempts({ version: 1, attempts: [attemptOne, attemptTwo] }));
    const timeRecords = toEntities(getTimeRecords());

    expect(timeRecords).toStrictEqual([attemptOne, attemptTwo]);
  });
});

describe("getTimeRecordsByTrack", () => {
  test("returns an empty array if no time records by track is found", () => {
    const { getTimeRecordsByTrack } = createRoot(() => useAttempts({ version: 1, attempts: [] }));
    expect(getTimeRecordsByTrack("No track")).toStrictEqual([]);
  });

  test("returns the time records for a specific track", () => {
    const { createAttempt, createSplit } = useBuildAttempt(1);
    const recordAttempt_A1 = createAttempt({ track: "A", splits: createSplit("3:00.000") });
    const recordAttempt_B = createAttempt({ track: "B", splits: createSplit("1:00.000") });
    const recordAttempt_A2 = createAttempt({ track: "A", splits: createSplit("3:00.000") });

    const { getTimeRecordsByTrack } = createRoot(() =>
      useAttempts({
        version: 1,
        attempts: [
          recordAttempt_A1,
          recordAttempt_A2,
          recordAttempt_B,
          createAttempt({ track: "B", splits: createSplit("8:00.000") }),
          createAttempt({ track: "A", splits: createSplit("5:00.000") }),
          createAttempt({ track: "B", splits: createSplit("4:00.000") }),
          createAttempt({ track: "A", splits: createSplit("7:00.000") }),
        ],
      }),
    );
    const timeRecordsByTrack = toEntities(getTimeRecordsByTrack("A"));
    expect(timeRecordsByTrack).toStrictEqual([recordAttempt_A1, recordAttempt_A2]);

    const timeRecordsByTrackIgnoreFirst = toEntities(getTimeRecordsByTrack("A", true));
    expect(timeRecordsByTrackIgnoreFirst).toStrictEqual([recordAttempt_A2]);
  });

  test("returns two time records if same time, but not same attempt", () => {
    const { createAttempt, createSplit } = useBuildAttempt(1, { track: "A" });

    const attemptOne = createAttempt({ player: "Attempt One", splits: createSplit("1:00.000") });
    const attemptTwo = createAttempt({ player: "Attempt Two", splits: createSplit("1:00.000") });

    const { getTimeRecordsByTrack } = createRoot(() => useAttempts({ version: 1, attempts: [attemptOne, attemptTwo] }));
    const timeRecords = toEntities(getTimeRecordsByTrack("A"));

    expect(timeRecords).toStrictEqual([attemptOne, attemptTwo]);
    expect(timeRecords).length(2);
  });
});

describe("getSplitRecordByTrack", () => {
  test("returns an empty array if no split records by track is found", () => {
    const { getSplitRecordByTrack } = createRoot(() => useAttempts({ version: 1, attempts: [] }));
    expect(getSplitRecordByTrack("A")).toStrictEqual([]);
  });

  test("returns the split records for a specific track", () => {
    const { createAttempt, createSplit } = useBuildAttempt(2, { track: "A" });
    const splitRecordAttempt_1 = createAttempt({ splits: createSplit("1:10.000") });
    const splitRecordAttempt_2 = createAttempt({ splits: createSplit("9:00.000", "1:20.000") });
    const splitRecordAttempt_3 = createAttempt({ splits: createSplit("1:10.000", "9:00.000") });

    const { getSplitRecordByTrack } = createRoot(() =>
      useAttempts({
        version: 1,
        attempts: [
          splitRecordAttempt_1,
          splitRecordAttempt_2,
          splitRecordAttempt_3,
          createAttempt({ splits: createSplit("9:00.000", "9:00.000") }),
          createAttempt({ splits: createSplit("9:00.000", "9:00.000") }),
        ],
      }),
    );

    const splitRecordsByTrack = toEntities(getSplitRecordByTrack("A")).at(0);
    expect(splitRecordsByTrack?.splits.at(0)).toStrictEqual(splitRecordAttempt_1.splits.at(0));
    expect(splitRecordsByTrack?.splits.at(1)).toStrictEqual(splitRecordAttempt_2.splits.at(1));

    const splitRecordsByTrackIgnoreFirst = toEntities(getSplitRecordByTrack("A", true)).at(0);
    expect(splitRecordsByTrackIgnoreFirst?.splits.at(0)).toStrictEqual(splitRecordAttempt_3.splits.at(0));
    expect(splitRecordsByTrackIgnoreFirst?.splits.at(1)).toStrictEqual(splitRecordAttempt_2.splits.at(1));
  });
});

describe("getFlattenRecords", () => {
  test("returns an empty array if there is no attempts", () => {
    const { getFlattenRecords } = createRoot(() => useAttempts({ version: 1, attempts: [] }));
    expect(getFlattenRecords()).toStrictEqual([]);
  });

  test("returns flatten records (split and time) ordered by descending timestamp without duplicate", () => {
    const { createAttempt, createSplit } = useBuildAttempt(2, { track: "A" });
    const record_1 = createAttempt({ splits: createSplit("1:10.000") });
    const record_2 = createAttempt({ splits: createSplit("9:00.000", "1:20.000") });

    const { getFlattenRecords } = createRoot(() =>
      useAttempts({
        version: 1,
        attempts: [record_2, record_1, createAttempt({ splits: createSplit("9:00.000", "9:00.000") })],
      }),
    );

    expect(getFlattenRecords()).toStrictEqual([record_2, record_1]);
  });
});

describe("merge", () => {
  test("returns an empty array if there is no attempts and merge nothing", () => {
    const { merge } = createRoot(() => useAttempts({ version: 1, attempts: [] }));
    expect(merge()).toStrictEqual([]);
  });

  test("returns the input array ordered by descending timestamp if there is no attempts", () => {
    const { createAttempt } = useBuildAttempt(1);
    const attempts = [createAttempt({}), createAttempt({})];

    const { merge } = createRoot(() => useAttempts({ version: 1, attempts: [] }));
    expect(merge(attempts)).toStrictEqual(attempts.toReversed());
  });

  test("returns an array without duplicates ordered by descending timestamp", () => {
    const { createAttempt } = useBuildAttempt(1);
    const duplicatedAttempt = createAttempt({});
    const attempts = [createAttempt({}), duplicatedAttempt];

    const { merge } = createRoot(() => useAttempts({ version: 1, attempts: [duplicatedAttempt] }));
    expect(merge(attempts)).toStrictEqual(attempts);
  });

  test("returns an array ordered by descending timestamp", () => {
    const { createAttempt } = useBuildAttempt(1);
    const attempt_1 = createAttempt({});
    const attempt_2 = createAttempt({});
    const attempt_3 = createAttempt({});
    const attempt_4 = createAttempt({});

    const { merge } = createRoot(() => useAttempts({ version: 1, attempts: [attempt_3, attempt_4] }));
    expect(merge([attempt_2, attempt_1])).toStrictEqual([attempt_4, attempt_3, attempt_2, attempt_1]);
  });
});
