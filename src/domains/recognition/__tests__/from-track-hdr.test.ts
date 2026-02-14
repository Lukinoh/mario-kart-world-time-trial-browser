import { expectedRecognition } from "../../test/utils/expected-recognition";
import { test } from "vitest";

test.for([
  {
    source: import.meta.glob<string>("./hdr-images/track/Acorn Heights.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Acorn Heights",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Airship Fortress.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Airship Fortress",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Boo Cinema.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Boo Cinema",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Bowser's Castle.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Bowser's Castle",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Cheep Cheep Falls.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Cheep Cheep Falls",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Choco Mountain.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Choco Mountain",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Crown City.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Crown City",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Dandelion Depths.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Dandelion Depths",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Desert Hills.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Desert Hills",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Dino Dino Jungle.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Dino Dino Jungle",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/DK Pass.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "DK Pass",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/DK Spaceport.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "6",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "DK Spaceport",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Dry Bones Burnout.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Dry Bones Burnout",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Faraway Oasis.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Faraway Oasis",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Great ؟ Block Ruins.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Great ? Block Ruins",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Koopa Troopa Beach.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "5",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Koopa Troopa Beach",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Mario Bros. Circuit.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Mario Bros. Circuit",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Mario Circuit.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Mario Circuit",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Moo Moo Meadows.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Moo Moo Meadows",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Peach Beach.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Peach Beach",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Peach Stadium.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Peach Stadium",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Rainbow Road.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "4",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Rainbow Road",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Salty Salty Speedway.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Salty Salty Speedway",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Shy Guy Bazaar.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Shy Guy Bazaar",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Sky-High Sundae.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Sky-High Sundae",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Starview Peak.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Starview Peak",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Toad's Factory.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Toad's Factory",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Wario Shipyard.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Wario Shipyard",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Wario Stadium.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Wario Stadium",
    },
  },
  {
    source: import.meta.glob<string>("./hdr-images/track/Whistlestop Summit.png", {
      eager: true,
      import: `default`,
    }),
    expected: {
      coins: "00",
      lap: "1",
      laps: "3",
      pause: false,
      shrooms: "3",
      time: "0:00.000",
      timeYellow: false,
      track: "Whistlestop Summit",
    },
  },
])("validate $source", async (params) => {
  await expectedRecognition(params, false);
});
