import { Box } from "../../image-manipulation/box/box";
import { ImageFilters } from "../../image-manipulation/image/image-filters";
import type { ImageRecognitionOptions } from "../../image-manipulation/image/image-recognition";
import { ImageSimilarity } from "../../image-manipulation/image/image-similarity";

export const ShroomsRegion = new Box(51, 146, 142, 53);

export const ShroomsRecognitionOptions: ImageRecognitionOptions = {
  identifier: "shrooms",
  region: ShroomsRegion,
  filter: ImageFilters.shroomsHighlight(),
  comparison: ImageSimilarity.mse(),
};
