import { Box } from "../../image-manipulation/box/box";
import { ImageFilters } from "../../image-manipulation/image/image-filters";
import type { ImageRecognitionOptions } from "../../image-manipulation/image/image-recognition";
import { ImageSimilarity } from "../../image-manipulation/image/image-similarity";

export const TrackRegion = new Box(325, 1280, 680, 977);

export const TrackRecognitionOptions: ImageRecognitionOptions = {
  identifier: "track",
  region: TrackRegion,
  filter: ImageFilters.identity,
  comparison: ImageSimilarity.hitchhikersSSIM(),
};
