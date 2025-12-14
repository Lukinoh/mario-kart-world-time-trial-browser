import { expectedRecognition } from "./recogntion-analysis";
import { test } from "vitest";

test.for([
  {
    source: import.meta.glob<string>("../assets/recognitions/raw/lap/1.png", { eager: true, import: `default` }),
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
  {
    source: import.meta.glob<string>("../assets/recognitions/raw/lap/2.png", { eager: true, import: `default` }),
    expected: {
      coins: "05",
      lap: "2",
      laps: "6",
      pause: false,
      shrooms: "3",
      time: "1:10.232",
      timeYellow: false,
      track: "DK Spaceport",
    },
  },
  {
    source: import.meta.glob<string>("../assets/recognitions/raw/lap/3.png", { eager: true, import: `default` }),
    expected: {
      coins: "00",
      lap: "3",
      laps: "6",
      pause: false,
      shrooms: "0",
      time: "2:32.101",
      timeYellow: false,
      track: "DK Spaceport",
    },
  },
  {
    source: import.meta.glob<string>("../assets/recognitions/raw/lap/4.png", { eager: true, import: `default` }),
    expected: {
      coins: "01",
      lap: "4",
      laps: "6",
      pause: false,
      shrooms: "0",
      time: "1:44.769",
      timeYellow: false,
      track: "DK Spaceport",
    },
  },
  {
    source: import.meta.glob<string>("../assets/recognitions/raw/lap/5.png", { eager: true, import: `default` }),
    expected: {
      coins: "06",
      lap: "5",
      laps: "6",
      pause: false,
      shrooms: "0",
      time: "2:50.658",
      timeYellow: false,
      track: "DK Spaceport",
    },
  },
  {
    source: import.meta.glob<string>("../assets/recognitions/raw/lap/6.png", { eager: true, import: `default` }),
    expected: {
      coins: "07",
      lap: "6",
      laps: "6",
      pause: false,
      shrooms: "0",
      time: "4:01.540",
      timeYellow: false,
      track: "DK Spaceport",
    },
  },
])("Validate $source", async (params) => {
  await expectedRecognition(params, true);
});
