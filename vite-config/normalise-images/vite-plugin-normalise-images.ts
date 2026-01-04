import "./canvas-shim";
import "./location-shim";
import { type NormaliseOptions, normalise } from "./normalise";
import { map, pipe } from "remeda";
import { mkdirSync, readdirSync, rmSync } from "node:fs";
import { PathHelper } from "../path-helpers";
import type { Plugin } from "vite";

interface NormaliseImagesOptions {
  rawFolder: string;
  normalisedFolder: string;
  categories: Array<NormaliseOptions>;
}

export function normaliseImages(options: NormaliseImagesOptions): Plugin {
  return {
    name: "normalise-images",
    async buildStart() {
      rmSync(options.normalisedFolder, { force: true, recursive: true });
      for (const category of options.categories) {
        const sourceFolder = PathHelper.concat(options.rawFolder, category.options.identifier);
        const targetFolder = PathHelper.concat(options.normalisedFolder, category.options.identifier);

        mkdirSync(targetFolder, { recursive: true });
        const sourcePaths = pipe(
          sourceFolder,
          (folder) => readdirSync(folder, { withFileTypes: true }),
          map((dirent) => `${dirent.parentPath}/${dirent.name}`),
        );

        for (const sourcePath of sourcePaths) {
          const targetPath = sourcePath.replace(sourceFolder, targetFolder);
          await normalise(sourcePath, targetPath, category);
        }
      }
    },
  };
}

export { CoinsRecognitionOptions } from "../../src/domains/recognitions/coins/coins-configuration";
export { LapRecognitionOptions } from "../../src/domains/recognitions/lap/lap-configuration";
export { LapsRecognitionOptions } from "../../src/domains/recognitions/laps/laps-configuration";
export { PauseRecognitionOptions } from "../../src/domains/recognitions/pause/pause-configuration";
export { ShroomsRecognitionOptions } from "../../src/domains/recognitions/shrooms/shrooms-configuration";
export { TimeRecognitionOptions } from "../../src/domains/recognitions/time/time-configuration";
export { TrackRecognitionOptions } from "../../src/domains/recognitions/track/track-configuration";
