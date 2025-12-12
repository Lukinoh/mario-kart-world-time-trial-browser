import { Box } from "../../tools/box/box";
import { ImageFilters } from "../../tools/image/image-filters";
import type { ImageRecognitionOptions } from "../../tools/image/image-recognition";
import { ImageSimilarity } from "../../tools/image/image-similarity";

export const LapRegion = new Box(655, 212, 684, 189);

export const LapRecognitionOptions: ImageRecognitionOptions = {
  identifier: "lap",
  region: LapRegion,
  filter: ImageFilters.blackAndWhite,
  comparison: ImageSimilarity.hitchhikersSSIM(),
};
