import { Box } from "../../image-manipulation/box/box";
import { ImageFilters } from "../../image-manipulation/image/image-filters";
import type { ImageRecognitionOptions } from "../../image-manipulation/image/image-recognition";
import { ImageSimilarity } from "../../image-manipulation/image/image-similarity";

export const CoinsRegions = {
  coin10: new Box(654, 102, 685, 79),
  coin01: new Box(654, 126, 685, 103),
} as const;

export const CoinsRecognitionOptions: ImageRecognitionOptions = {
  identifier: "coins",
  region: CoinsRegions.coin01,
  filter: ImageFilters.blackAndWhite({ threshold: 200 }),
  comparison: ImageSimilarity.hitchhikersSSIM(),
};
