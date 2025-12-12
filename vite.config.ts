import { CoinsRecognitionOptions } from "./src/recognitions/coins/coins-configuration";
import { LapRecognitionOptions } from "./src/recognitions/lap/lap-configuration";
import { LapsRecognitionOptions } from "./src/recognitions/laps/laps-configuration";
import { PathHelper } from "./vite-config/path-helpers";
import { PauseRecognitionOptions } from "./src/recognitions/pause/pause-configuration";
import { ShroomsRecognitionOptions } from "./src/recognitions/shrooms/shrooms-configuration";
import { TimeRecognitionOptions } from "./src/recognitions/time/time-configuration";
import { TrackRecognitionOptions } from "./src/recognitions/track/track-configuration";
import { defineConfig } from "vite";
import devtools from "solid-devtools/vite";
import { normaliseImages } from "./vite-config/normalise-images/vite-plugin-normalise-images";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    solidPlugin(),
    normaliseImages({
      rawFolder: PathHelper.root("src", "assets", "recognitions", "raw"),
      normalisedFolder: PathHelper.root("src", "assets", "recognitions", "normalised"),
      categories: [
        { options: CoinsRecognitionOptions, with: "sharp" },
        { options: LapRecognitionOptions, with: "sharp" },
        { options: LapsRecognitionOptions, with: "sharp" },
        { options: PauseRecognitionOptions, with: "canvas" },
        { options: ShroomsRecognitionOptions, with: "canvas" },
        { options: TimeRecognitionOptions, with: "sharp" },
        { options: TrackRecognitionOptions, with: "canvas" },
      ],
    }),
  ],
  server: {
    port: 4440,
  },
  build: {
    target: "esnext",
  },
});
