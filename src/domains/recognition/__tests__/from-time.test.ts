import { expectedRecognition } from "../../test/utils/expected-recognition";
import { test } from "vitest";

test.for([
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/time/0.png", { eager: true, import: `default` }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "1:20.332",
      timeYellow: false,
      track: "Mario Circuit",
    },
  },
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/time/1.png", { eager: true, import: `default` }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "1:11.578",
      timeYellow: false,
      track: "Mario Circuit",
    },
  },
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/time/2.png", { eager: true, import: `default` }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "1:52.356",
      timeYellow: false,
      track: "Mario Circuit",
    },
  },
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/time/3.png", { eager: true, import: `default` }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "1:03.308",
      timeYellow: false,
      track: "Mario Circuit",
    },
  },
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/time/4.png", { eager: true, import: `default` }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "1:14.520",
      timeYellow: false,
      track: "Mario Circuit",
    },
  },
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/time/5.png", { eager: true, import: `default` }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "2:25.364",
      timeYellow: false,
      track: "Mario Circuit",
    },
  },
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/time/6.png", { eager: true, import: `default` }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "1:06.648",
      timeYellow: false,
      track: "Mario Circuit",
    },
  },
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/time/7.png", { eager: true, import: `default` }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "1:17.390",
      timeYellow: false,
      track: "Mario Circuit",
    },
  },
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/time/8.png", { eager: true, import: `default` }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "2:38.386",
      timeYellow: false,
      track: "Mario Circuit",
    },
  },
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/time/9.png", { eager: true, import: `default` }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "1:09.449",
      timeYellow: false,
      track: "Mario Circuit",
    },
  },
])("validate $source", async (params) => {
  await expectedRecognition(params, true);
});
