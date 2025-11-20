import { mapValues, pipe } from "remeda";
import { Box } from "../tools/box/box";
import type { EnhancedImageData } from "../tools/image/enhanced-image-data";
import { ImageComparison } from "../tools/image/image-comparison";
import { ImageFilters } from "../tools/image/image-filters";
import { createRecognitionRegionImage } from "../tools/image/image-recognition";
import { loadImages } from "../tools/image/image-loader";

const images = await loadImages(
  import.meta.glob<string>("../assets/sources/extract-time-digits/*.png", { eager: true, import: `default` }),
);

const BOXES = {
  minute: new Box(37, 1065, 71, 1038),
  second10: new Box(37, 1113, 71, 1086),
  second01: new Box(37, 1140, 71, 1113),
  milisecond100: new Box(37, 1185, 71, 1158),
  milisecond010: new Box(37, 1212, 71, 1185),
  milisecond001: new Box(37, 1239, 71, 1212),
} as const;

const CoinsRecognition = createRecognitionRegionImage(images, BOXES.second01, {
  filter: ImageFilters.blackAndWhite,
  comparison: ImageComparison.hitchhikersSSIM,
});

export function getTime(image: EnhancedImageData, context?: CanvasRenderingContext2D): string {
  return pipe(
    BOXES,
    mapValues((box) => CoinsRecognition.getMatch(image, box)),
    (matches) => {
      context?.putImageData(matches.minute.value, ...BOXES.minute.putImageData());
      context?.putImageData(matches.second10.value, ...BOXES.second10.putImageData());
      context?.putImageData(matches.second01.value, ...BOXES.second01.putImageData());
      context?.putImageData(matches.milisecond100.value, ...BOXES.milisecond100.putImageData());
      context?.putImageData(matches.milisecond010.value, ...BOXES.milisecond010.putImageData());
      context?.putImageData(matches.milisecond001.value, ...BOXES.milisecond001.putImageData());
      return `${matches.minute.filename}:${matches.second10.filename}${matches.second01.filename}.${matches.milisecond100.filename}${matches.milisecond010.filename}${matches.milisecond001.filename}`;
    },
  );
}
