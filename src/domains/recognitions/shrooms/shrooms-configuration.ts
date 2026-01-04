import { Box } from "../../../tools/box/box";
import { ImageFilters } from "../../../tools/image/image-filters";
import type { ImageRecognitionOptions } from "../../../tools/image/image-recognition";
import { ImageSimilarity } from "../../../tools/image/image-similarity";

export const ShroomsRegion = new Box(43, 153, 143, 43);

export const ShroomsRecognitionOptions: ImageRecognitionOptions = {
  identifier: "shrooms",
  region: ShroomsRegion,
  filter: ImageFilters.invert,
  comparison: ImageSimilarity.ssim(),
};
