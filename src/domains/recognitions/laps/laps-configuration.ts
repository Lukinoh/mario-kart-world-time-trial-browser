import { Box } from "../../image-manipulation/box/box";
import { ImageFilters } from "../../image-manipulation/image/image-filters";
import type { ImageRecognitionOptions } from "../../image-manipulation/image/image-recognition";
import { ImageSimilarity } from "../../image-manipulation/image/image-similarity";

export const LapsRegion = new Box(661, 245, 684, 227);

export const LapsRecognitionOptions: ImageRecognitionOptions = {
  identifier: "laps",
  region: LapsRegion,
  filter: ImageFilters.blackAndWhite,
  comparison: ImageSimilarity.hitchhikersSSIM(),
};
