import { Box } from "../../image-manipulation/box/box";
import { ImageFilters } from "../../image-manipulation/image/image-filters";
import type { ImageRecognitionOptions } from "../../image-manipulation/image/image-recognition";
import { ImageSimilarity } from "../../image-manipulation/image/image-similarity";

export const TrackRegion = new Box(325, 1280, 680, 977);

export const TrackRecognitionOptions: ImageRecognitionOptions = {
  identifier: "track",
  region: TrackRegion,
  filter: ImageFilters.kMeans({
    // Technically 3 is enough, but 4 should be more robust to hiccups
    k: 4,
    // Mean when iterating until convergence for all the tracks
    maxIterations: 10,
  }),
  comparison: ImageSimilarity.mse(),
};
