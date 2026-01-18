import { expectedRecognition } from "../../test/utils/expected-recognition";
import { test } from "vitest";

test.for([
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/shrooms/1.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "1",
      time: "1:27.029",
      timeYellow: false,
      track: "Mario Circuit",
    },
  },
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/shrooms/1-bump.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "1",
      time: "7:15.639",
      timeYellow: false,
      track: "Mario Circuit",
    },
  },
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/shrooms/1-from-2.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "1",
      time: "0:03.853",
      timeYellow: false,
      track: "Mario Circuit",
    },
  },
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/shrooms/2.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "2",
      time: "1:04.382",
      timeYellow: false,
      track: "Mario Circuit",
    },
  },
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/shrooms/2-bump.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "2",
      time: "1:20.143",
      timeYellow: false,
      track: "Mario Circuit",
    },
  },
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/shrooms/2-from-3.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "2",
      time: "0:01.753",
      timeYellow: false,
      track: "Mario Circuit",
    },
  },
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/shrooms/3.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:20.552",
      timeYellow: false,
      track: "Mario Circuit",
    },
  },
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/shrooms/3-bump.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:29.150",
      timeYellow: false,
      track: "Mario Circuit",
    },
  },
])("validate $source", async (params) => {
  await expectedRecognition(params, true);
});
