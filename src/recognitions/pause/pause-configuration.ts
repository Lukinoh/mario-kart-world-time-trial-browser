import { Box } from "../../tools/box/box";
import { ImageFilters } from "../../tools/image/image-filters";
import type { ImageRecognitionOptions } from "../../tools/image/image-recognition";
import { ImageSimilarity } from "../../tools/image/image-similarity";

// All the dots are quite similar, it would be possible to increase the surface of the box by adding the same shift to each boxes.
export const PauseRegions = {
  menuRight1: new Box(191, 486, 208, 469),
  menuRight2: new Box(271, 486, 288, 469),
  menuRight3: new Box(351, 486, 368, 469),
  menuRight4: new Box(431, 486, 448, 469),
  menuRight5: new Box(511, 486, 528, 469),
  menuLeft1: new Box(191, 811, 208, 794),
  menuLeft2: new Box(271, 811, 288, 794),
  menuLeft3: new Box(351, 811, 368, 794),
  menuLeft4: new Box(431, 811, 448, 794),
  menuLeft5: new Box(511, 811, 528, 794),
} as const;

export const PauseRecognitionOptions: ImageRecognitionOptions = {
  identifier: "pause",
  region: PauseRegions.menuLeft2,
  filter: ImageFilters.identity,
  comparison: ImageSimilarity.hitchhikersSSIM(),
};
