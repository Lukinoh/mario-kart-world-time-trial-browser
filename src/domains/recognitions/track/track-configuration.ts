import { Box } from "../../../tools/box/box";
import { ImageFilters } from "../../../tools/image/image-filters";
import type { ImageRecognitionOptions } from "../../../tools/image/image-recognition";
import { ImageSimilarity } from "../../../tools/image/image-similarity";

export const TrackRegion = new Box(325, 1280, 680, 977);

export const TrackRecognitionOptions: ImageRecognitionOptions = {
  identifier: "track",
  region: TrackRegion,
  filter: ImageFilters.identity,
  comparison: ImageSimilarity.hitchhikersSSIM(),
};
