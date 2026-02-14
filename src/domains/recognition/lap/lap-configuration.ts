import { Box } from "../../image-manipulation/box/box";
import { ImageFilters } from "../../image-manipulation/image/image-filters";
import type { ImageRecognitionOptions } from "../../image-manipulation/image/image-recognition";
import { ImageSimilarity } from "../../image-manipulation/image/image-similarity";

export const LapRegion = new Box(655, 212, 684, 189);

export const LapRecognitionOptions: ImageRecognitionOptions = {
  identifier: "lap",
  region: LapRegion,
  filter: ImageFilters.blackAndWhite({ threshold: 170 }),
  comparison: ImageSimilarity.mse(),
};
