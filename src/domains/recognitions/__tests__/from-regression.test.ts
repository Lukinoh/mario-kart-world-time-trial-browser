import { expectedRecognition } from "../../tests/utils/expected-recognition";
import { test } from "vitest";

// This file contains specific test cases that used to be wrongly interpreted.

test.for([
  {
    source: import.meta.glob<string>("./regression-images/fake-yellow-time.png", { eager: true, import: `default` }),
    expected: {
      coins: "11",
      lap: "1",
      laps: "3",
      pause: true,
      shrooms: "0",
      time: "7:44.444",
      timeYellow: false,
      track: "Dino Dino Jungle",
    },
  },
  {
    source: import.meta.glob<string>("./regression-images/no-yellow-time.png", { eager: true, import: `default` }),
    expected: {
      coins: "03",
      lap: "2",
      laps: "3",
      pause: false,
      shrooms: "0",
      time: "1:04.544",
      timeYellow: false,
      track: "Dino Dino Jungle",
    },
  },
  {
    source: import.meta.glob<string>("./regression-images/yellow-time.png", { eager: true, import: `default` }),
    expected: {
      coins: "02",
      lap: "2",
      laps: "3",
      pause: false,
      shrooms: "2",
      time: "0:53.012",
      timeYellow: true,
      track: "Wario Shipyard",
    },
  },
])("Validate $source", async (params) => {
  await expectedRecognition(params, true);
});
