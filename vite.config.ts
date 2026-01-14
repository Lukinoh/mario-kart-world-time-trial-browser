import {
  CoinsRecognitionOptions,
  LapRecognitionOptions,
  LapsRecognitionOptions,
  PauseRecognitionOptions,
  ShroomsRecognitionOptions,
  TimeRecognitionOptions,
  TrackRecognitionOptions,
  normaliseImages,
} from "./vite-config/normalise-images/vite-plugin-normalise-images";
import { PathHelper } from "./vite-config/path-helpers";
import { defineConfig } from "vite";
import devtools from "solid-devtools/vite";
import solidPlugin from "vite-plugin-solid";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [
    devtools(),
    solidPlugin(),
    viteSingleFile({
      overrideConfig: {
        // Offline base is handled directly in the app, this base is for the serve
        base: "/",
      },
    }),
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
