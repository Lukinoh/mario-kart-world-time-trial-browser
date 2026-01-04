import { Box } from "../../image-manipulation/box/box";
import { ImageFilters } from "../../image-manipulation/image/image-filters";
import type { ImageRecognitionOptions } from "../../image-manipulation/image/image-recognition";
import { ImageSimilarity } from "../../image-manipulation/image/image-similarity";

export const TimeRegions = {
  minute: new Box(37, 1065, 71, 1038),
  second10: new Box(37, 1113, 71, 1086),
  second01: new Box(37, 1140, 71, 1113),
  milisecond100: new Box(37, 1185, 71, 1158),
  milisecond010: new Box(37, 1212, 71, 1185),
  milisecond001: new Box(37, 1239, 71, 1212),
} as const;

export const TimeRecognitionOptions: ImageRecognitionOptions = {
  identifier: "time",
  region: TimeRegions.second01,
  filter: ImageFilters.blackAndWhite,
  comparison: ImageSimilarity.hitchhikersSSIM(),
};
