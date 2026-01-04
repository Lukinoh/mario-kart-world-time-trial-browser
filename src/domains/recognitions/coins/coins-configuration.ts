import { Box } from "../../../tools/box/box";
import { ImageFilters } from "../../../tools/image/image-filters";
import type { ImageRecognitionOptions } from "../../../tools/image/image-recognition";
import { ImageSimilarity } from "../../../tools/image/image-similarity";

export const CoinsRegions = {
  coin10: new Box(654, 102, 685, 79),
  coin01: new Box(654, 126, 685, 103),
} as const;

export const CoinsRecognitionOptions: ImageRecognitionOptions = {
  identifier: "coins",
  region: CoinsRegions.coin01,
  filter: ImageFilters.blackAndWhite,
  comparison: ImageSimilarity.hitchhikersSSIM(),
};
