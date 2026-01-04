import { expectedRecognition } from "../../test/utils/expected-recognition";
import { test } from "vitest";

test.for([
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/laps/3.png", { eager: true, import: `default` }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "0",
      time: "0:56.504",
      timeYellow: false,
      track: "Mario Circuit",
    },
  },
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/laps/4.png", { eager: true, import: `default` }),
    expected: {
      coins: "02",
      lap: "1",
      laps: "4",
      pause: false,
      shrooms: "3",
      time: "1:31.553",
      timeYellow: false,
      track: "Rainbow Road",
    },
  },
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/laps/5.png", { eager: true, import: `default` }),
    expected: {
      coins: "00",
      lap: "2",
      laps: "5",
      pause: false,
      shrooms: "3",
      time: "0:49.178",
      timeYellow: false,
      track: "Koopa Troopa Beach",
    },
  },
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/laps/6.png", { eager: true, import: `default` }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "6",
      pause: false,
      shrooms: "3",
      time: "0:18.461",
      timeYellow: false,
      track: "DK Spaceport",
    },
  },
])("Validate $source", async (params) => {
  await expectedRecognition(params, true);
});
