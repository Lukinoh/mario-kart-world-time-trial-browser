import { describe, expect, test } from "vitest";
import { map, pipe } from "remeda";
import type { Attempt } from "../domain/types/attempt";
import { AttemptsUtils } from "./attempts-utils";
import type { Split } from "../domain/types/split";

let timestamp = 0;

const createAttempts = (...attempts: Array<Partial<Attempt>>): Array<Attempt> => {
  return pipe(
    attempts,
    map((attempt) => {
      timestamp = timestamp + 1;
      return {
        player: "Noname",
        track: "A track",
        timestamp: timestamp,
        laps: 0,
        splits: [],
        ...attempt,
      };
    }),
  );
};

const createSplits = (...splits: Array<Partial<Split>>): Array<Split> => {
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
};

describe("getRecords (= getData.records)", () => {
  test("returns empty object if there is no attempts", () => {
    const records = AttemptsUtils.getRecords([]);
    expect(records).toStrictEqual({});
  });

  test("returns undefined if there is no time for a track", () => {
    const attempts = createAttempts(
      {
        track: "TrackA",
      },
      {
        track: "TrackA",
      },
      {
        track: "TrackA",
      },
    );

    const records = AttemptsUtils.getRecords(attempts);

    expect(records.TrackA).toBeUndefined();
    expect(records.TrackB).toBeUndefined();

    const data = AttemptsUtils.getData(attempts);
    expect(data.TrackA?.records).toStrictEqual(records.TrackA);
    expect(data.TrackB?.records).toStrictEqual(records.TrackB);
  });

  test("returns the records attempts for each track", () => {
    const attempts = createAttempts(
      {
        track: "TrackA",
        time: "1:00.000",
      },
      {
        track: "TrackA",
        time: "1:00.000",
      },
      {
        track: "TrackA",
        time: "2:00.000",
      },
      {
        track: "TrackB",
        time: "0:10.000",
      },
      {
        track: "TrackB",
        time: "1:10.000",
      },
    );
    const records = AttemptsUtils.getRecords(attempts);

    expect(records.TrackA).length(2);
    expect(records.TrackB).length(1);
    expect(records.TrackA?.at(0)?.time).toBe("1:00.000");
    expect(records.TrackA?.at(1)?.time).toBe("1:00.000");
    expect(records.TrackB?.at(0)?.time).toBe("0:10.000");
    expect(records.TrackC).toBeUndefined();

    const data = AttemptsUtils.getData(attempts);
    expect(data.TrackA?.records).toStrictEqual(records.TrackA);
    expect(data.TrackB?.records).toStrictEqual(records.TrackB);
    expect(data.TrackC?.records).toStrictEqual(records.TrackC);
  });

  test("ignores attempts with undefined time", () => {
    const attempts = createAttempts(
      {
        track: "TrackA",
      },
      {
        track: "TrackA",
        time: "0:20.000",
      },
      {
        track: "TrackA",
      },
      {
        track: "TrackA",
        time: "0:50.000",
      },
      {
        track: "TrackA",
      },
    );
    const records = AttemptsUtils.getRecords(attempts);

    expect(records.TrackA).length(1);
    expect(records.TrackA?.at(0)?.time).toBe("0:20.000");

    const data = AttemptsUtils.getData(attempts);
    expect(data.TrackA?.records).toStrictEqual(records.TrackA);
  });
});

describe("getData", () => {
  test("returns empty object if there is no attempts", () => {
    const data = AttemptsUtils.getData([]);
    expect(data).toStrictEqual({});
  });

  describe("split_X", () => {
    test("returns for each split the attempts with the best split", () => {
      const data = AttemptsUtils.getData(
        createAttempts(
          {
            track: "TrackA",
            laps: 4,
            player: "1",
          },
          {
            track: "TrackA",
            laps: 4,
            player: "2",
            splits: createSplits({
              time: "0:10.000",
            }),
          },
          {
            track: "TrackA",
            laps: 4,
            player: "2",
            splits: createSplits(
              {
                time: "0:20.000",
              },
              {
                time: "0:40.000",
              },
            ),
          },
          {
            track: "TrackA",
            laps: 4,
            player: "3",
            splits: createSplits({
              time: "0:30.000",
            }),
          },
          {
            track: "TrackA",
            laps: 4,
            player: "4",
            splits: createSplits(
              {
                time: "0:10.000",
              },
              {
                time: "0:20.000",
              },
            ),
          },
          {
            track: "TrackA",
            laps: 4,
            player: "5",
            splits: createSplits(
              {
                time: "0:10.000",
              },
              {
                time: "0:20.000",
              },
              {
                time: "0:30.000",
              },
            ),
          },
        ),
      );

      const split_1 = data.TrackA?.split_1;
      const split_2 = data.TrackA?.split_2;
      const split_3 = data.TrackA?.split_3;
      const split_4 = data.TrackA?.split_4;

      expect(split_1).length(3);
      expect(split_2).length(2);
      expect(split_3).length(1);
      expect(split_4).toBeUndefined();

      expect(split_1?.at(0)?.splits.at(0)?.time).toBe("0:10.000");
      expect(split_1?.at(1)?.splits.at(0)?.time).toBe("0:10.000");
      expect(split_1?.at(2)?.splits.at(0)?.time).toBe("0:10.000");

      expect(split_2?.at(0)?.splits.at(1)?.time).toBe("0:20.000");
      expect(split_2?.at(1)?.splits.at(1)?.time).toBe("0:20.000");

      expect(split_3?.at(0)?.splits.at(2)?.time).toBe("0:30.000");
    });
  });
});

describe("flattenRecords", () => {
  test("returns flat list of attempts without duplicates and ordered by timestamp", () => {
    const data = AttemptsUtils.getData(
      createAttempts(
        {
          timestamp: 100,
          track: "TrackA",
          laps: 4,
          player: "1",
          time: "0:50.000",
          splits: createSplits(
            {
              time: "1:10.00",
            },
            {
              time: "1:20.00",
            },
          ),
        },
        {
          timestamp: 50,
          track: "TrackA",
          laps: 4,
          player: "2",
          time: "0:50.000",
          splits: createSplits(
            {
              time: "0:10.00",
            },
            {
              time: "2:20.00",
            },
            {
              time: "3:30.00",
            },
          ),
        },
        {
          timestamp: 200,
          track: "TrackA",
          laps: 4,
          player: "3",
          time: "0:20.000",
          splits: [],
        },
        {
          timestamp: 200,
          track: "TrackA",
          laps: 4,
          player: "3",
          time: "0:20.000",
          splits: [],
        },
      ),
    );

    const flatten = AttemptsUtils.flattenRecords(data);
    expect(flatten).length(3);
    expect(flatten.at(0)?.timestamp).toBe(50);
    expect(flatten.at(1)?.timestamp).toBe(100);
    expect(flatten.at(2)?.timestamp).toBe(200);
  });
});
