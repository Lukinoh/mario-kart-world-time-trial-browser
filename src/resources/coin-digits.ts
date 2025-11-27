import { mapValues, pipe } from "remeda";
import { Box } from "../tools/box/box";
import type { EnhancedImageData } from "../tools/image/enhanced-image-data";
import { ImageComparison } from "../tools/image/image-comparison";
import { ImageFilters } from "../tools/image/image-filters";
import { createRecognitionRegionImage } from "../tools/image/image-recognition";
import { loadImages } from "../tools/image/image-loader";

const images = await loadImages(
  import.meta.glob<string>("../assets/sources/extract-coins-digits/*.png", {
    eager: true,
    import: `default`,
  }),
);

const BOXES = {
  coin10: new Box(654, 102, 685, 79),
  coin01: new Box(654, 126, 685, 103),
} as const;

const CoinsRecognition = createRecognitionRegionImage(images, BOXES.coin01, {
  filter: ImageFilters.blackAndWhite,
  comparison: ImageComparison.hitchhikersSSIM,
});

export function getCoins(image: EnhancedImageData, putImageData?: CanvasImageData["putImageData"]): string {
  return pipe(
    BOXES,
    mapValues((box) => CoinsRecognition.getMatch(image, box)),
    (matches) => {
      putImageData?.(matches.coin01.value, ...BOXES.coin01.putImageData());
      putImageData?.(matches.coin10.value, ...BOXES.coin10.putImageData());
      return `${matches.coin10.filename.at(1)}${matches.coin01.filename.at(1)}`;
    },
  );
}
