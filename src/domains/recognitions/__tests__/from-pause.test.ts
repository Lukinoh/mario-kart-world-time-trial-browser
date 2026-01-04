import { expectedRecognition } from "../../tests/utils/expected-recognition";
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
      time: "4:41.144",
      timeYellow: false,
      track: "Dino Dino Jungle",
    },
  },
])("Validate $source", async (params) => {
  await expectedRecognition(params, true);
});
