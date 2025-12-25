import { describe, expect, test } from "vitest";
import { map, pipe } from "remeda";
import type { Attempt } from "../../core/domain/types/attempt";
import type { Split } from "../../core/domain/types/split";
import { createRoot } from "solid-js";
import { useAttempts } from "./use-attempts";

describe("attempts", () => {
  test("returns the lists of attempts", () => {
    const input: Array<Attempt> = [];
    const { attempts } = createRoot(() => useAttempts({ version: 1, attempts: input }));
    expect(attempts()).toBe(input);
  });
});

describe("tracks", () => {
  test("returns empty array if there is not attempts", () => {
    const { tracks } = createRoot(() => useAttempts({ version: 1, attempts: [] }));
    expect(tracks()).toStrictEqual([]);
  });

  test("returns the list of tracks in alphabetic order", () => {
    const { tracks } = createRoot(() =>
      useAttempts({
        version: 1,
        attempts: createAttempts(
          {
            track: "D",
          },
          {
            track: "A",
          },
          {
            track: "D",
          },
          {
            track: "C",
          },
          {
            track: "A",
          },
          {
            track: "B",
          },
        ),
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
    // The attempts are stored from more recent to older.
    const { lastAttempt } = createRoot(() =>
      useAttempts({
        version: 1,
        attempts: createAttempts(
          { player: "Last Attempt" },
          { player: "Attempt Before Last Attempt" },
          { player: "Attempt Before Before Last Attempt" },
        ),
      }),
    );
    expect(lastAttempt()?.player).toBe("Last Attempt");
  });
});

describe("getTimeRecords", () => {
  test("returns empty array if no time records is found", () => {
    const { getTimeRecords } = createRoot(() => useAttempts({ version: 1, attempts: [] }));
    expect(getTimeRecords()).toStrictEqual([]);
  });

  test("returns the time records for each track ordered", () => {
    const recordAttempt_A = createAttempt({ track: "A", time: "3:00.000" });
    const recordAttempt_B = createAttempt({ track: "B", time: "1:00.000" });

    const { getTimeRecords } = createRoot(() =>
      useAttempts({
        version: 1,
        attempts: createAttempts(
          recordAttempt_A,
          {
            track: "B",
            time: "8:00.000",
          },
          {
            track: "A",
            time: "5:00.000",
          },
          {
            track: "B",
            time: "4:00.000",
          },
          {
            track: "A",
            time: "7:00.000",
          },
          recordAttempt_B,
        ),
      }),
    );
    const timeRecords = getTimeRecords();
    expect(timeRecords).toStrictEqual([recordAttempt_A, recordAttempt_B]);
  });

  test("returns two time records if same time, but not same attempt", () => {
    const attemptOne = createAttempt({ track: "A", time: "1:00.000", player: "Attempt One" });
    const attemptTwo = createAttempt({ track: "A", time: "1:00.000", player: "Attempt Two" });

    const { getTimeRecords } = createRoot(() => useAttempts({ version: 1, attempts: [attemptOne, attemptTwo] }));
    const timeRecords = getTimeRecords();

    expect(timeRecords).toStrictEqual([attemptOne, attemptTwo]);
  });
});

describe("getTimeRecordsByTrack", () => {
  test("returns empty array if no time records by track is found", () => {
    const { getTimeRecordsByTrack } = createRoot(() => useAttempts({ version: 1, attempts: [] }));
    expect(getTimeRecordsByTrack("No track")).toStrictEqual([]);
  });

  test("returns the time records for a specific track", () => {
    const recordAttempt_A1 = createAttempt({ track: "A", time: "3:00.000" });
    const recordAttempt_B = createAttempt({ track: "B", time: "1:00.000" });
    const recordAttempt_A2 = createAttempt({ track: "A", time: "3:00.000" });

    const { getTimeRecordsByTrack } = createRoot(() =>
      useAttempts({
        version: 1,
        attempts: createAttempts(
          recordAttempt_A1,
          recordAttempt_A2,
          recordAttempt_B,
          {
            track: "B",
            time: "8:00.000",
          },
          {
            track: "A",
            time: "5:00.000",
          },
          {
            track: "B",
            time: "4:00.000",
          },
          {
            track: "A",
            time: "7:00.000",
          },
        ),
      }),
    );
    expect(getTimeRecordsByTrack("A")).toStrictEqual([recordAttempt_A1, recordAttempt_A2]);
  });

  test("returns two time records if same time, but not same attempt", () => {
    const attemptOne = createAttempt({ track: "A", time: "1:00.000", player: "Attempt One" });
    const attemptTwo = createAttempt({ track: "A", time: "1:00.000", player: "Attempt Two" });

    const { getTimeRecordsByTrack } = createRoot(() => useAttempts({ version: 1, attempts: [attemptOne, attemptTwo] }));
    const timeRecords = getTimeRecordsByTrack("A");

    expect(timeRecords).toStrictEqual([attemptOne, attemptTwo]);
    expect(timeRecords).length(2);
  });
});

describe("getSplitRecordsByTrack", () => {
  test("returns empty array if no split records by track is found", () => {
    const { getSplitRecordsByTrack } = createRoot(() => useAttempts({ version: 1, attempts: [] }));
    expect(getSplitRecordsByTrack("A", 1)).toStrictEqual([]);
  });

  test("returns the split records for a specific track", () => {
    const splitRecordAttempt_1 = createAttempt({
      track: "A",
      splits: createSplits({
        time: "1:10.000",
      }),
    });
    const splitRecordAttempt_2 = createAttempt({
      track: "A",
      splits: createSplits(
        {
          time: "9:00.000",
        },
        {
          time: "1:20.000",
        },
      ),
    });
    const splitRecordAttempt_3 = createAttempt({
      track: "A",
      splits: createSplits(
        {
          time: "1:10.000",
        },
        {
          time: "9:00.000",
        },
      ),
    });

    const { getSplitRecordsByTrack } = createRoot(() =>
      useAttempts({
        version: 1,
        attempts: createAttempts(
          splitRecordAttempt_1,
          splitRecordAttempt_2,
          splitRecordAttempt_3,
          {
            track: "A",
            splits: createSplits(
              {
                time: "9:00.000",
              },
              {
                time: "9:00.000",
              },
            ),
          },
          {
            track: "A",
            splits: createSplits(
              {
                time: "9:00.000",
              },
              {
                time: "9:00.000",
              },
            ),
          },
        ),
      }),
    );

    expect(getSplitRecordsByTrack("A", 1)).toStrictEqual([splitRecordAttempt_1, splitRecordAttempt_3]);
    expect(getSplitRecordsByTrack("A", 2)).toStrictEqual([splitRecordAttempt_2]);
    expect(getSplitRecordsByTrack("A", 3)).toStrictEqual([]);
  });
});

describe("getFlattenRecords", () => {
  test("returns empty array if there is not attempts", () => {
    const { getFlattenRecords } = createRoot(() => useAttempts({ version: 1, attempts: [] }));
    expect(getFlattenRecords()).toStrictEqual([]);
  });

  test("returns flatten records (split and time) ordered by timestamp without duplicate", () => {
    const record_A1 = createAttempt({
      track: "A",
      time: "1:10.000",
      laps: 2,
      splits: createSplits({
        time: "1:10.000",
      }),
    });
    const record_A2 = createAttempt({
      track: "A",
      laps: 2,
      splits: createSplits(
        {
          time: "9:00.000",
        },
        {
          time: "1:20.000",
        },
      ),
    });

    const { getFlattenRecords } = createRoot(() =>
      useAttempts({
        version: 1,
        attempts: createAttempts(record_A2, record_A1, {
          track: "A",
          time: "9:00.000",
          laps: 2,
          splits: createSplits(
            {
              time: "9:00.000",
            },
            {
              time: "9:00.000",
            },
          ),
        }),
      }),
    );

    expect(getFlattenRecords()).toStrictEqual([record_A1, record_A2]);
  });
});

/**
 * Helpers
 */

let timestamp = 0;

function createAttempt(attempt: Partial<Attempt>): Attempt {
  timestamp = timestamp + 1;
  return {
    player: "Noname",
    track: "A track",
    timestamp: timestamp,
    laps: 0,
    splits: [],
    ...attempt,
  };
}

function createAttempts(...attempts: Array<Partial<Attempt>>): Array<Attempt> {
  return pipe(
    attempts,
    map((attempt) => createAttempt(attempt)),
  );
}

function createSplits(...splits: Array<Partial<Split>>): Array<Split> {
  let lap = 0;
  return pipe(
    splits,
    map((split) => {
      lap = lap + 1;
      return {
        lap: lap,
        shrooms: 0,
        time: "0:00.000",
        coins: 0,
        ...split,
      };
    }),
  );
}
