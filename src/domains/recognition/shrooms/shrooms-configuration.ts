import { Box } from "../../image-manipulation/box/box";
import { ImageFilters } from "../../image-manipulation/image/image-filters";
import type { ImageRecognitionOptions } from "../../image-manipulation/image/image-recognition";
import { ImageSimilarity } from "../../image-manipulation/image/image-similarity";

export const ShroomsRegion = new Box(51, 146, 142, 53);

export const ShroomsRecognitionOptions: ImageRecognitionOptions = {
  identifier: "shrooms",
  region: ShroomsRegion,
  filter: ImageFilters.kMeans({
    // The images have 4 main dominant colors
    k: 4,
    // Mean when iterating until convergence for all the images of shrooms
    maxIterations: 20,
  }),
  comparison: ImageSimilarity.mse(),
};
