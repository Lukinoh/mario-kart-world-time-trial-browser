import { Box } from "../../../tools/box/box";
import { ImageFilters } from "../../../tools/image/image-filters";
import type { ImageRecognitionOptions } from "../../../tools/image/image-recognition";
import { ImageSimilarity } from "../../../tools/image/image-similarity";

export const LapsRegion = new Box(661, 245, 684, 227);

export const LapsRecognitionOptions: ImageRecognitionOptions = {
  identifier: "laps",
  region: LapsRegion,
  filter: ImageFilters.blackAndWhite,
  comparison: ImageSimilarity.hitchhikersSSIM(),
};
