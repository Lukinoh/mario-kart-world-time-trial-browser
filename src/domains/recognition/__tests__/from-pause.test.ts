import { expectedRecognition } from "../../test/utils/expected-recognition";
import { test } from "vitest";

test.for([
  {
    source: import.meta.glob<string>("../../../assets/recognitions/raw/pause/model.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "11",
      lap: "1",
      laps: "3",
      pause: true,
      shrooms: "0",
      time: "1:11.111",
      timeYellow: false,
      track: "Dino Dino Jungle",
    },
  },
])("validate $source", async (params) => {
  await expectedRecognition(params, true);
});
