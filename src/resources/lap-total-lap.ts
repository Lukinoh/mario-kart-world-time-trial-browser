import { Box } from "../tools/box/box";
import type { EnhancedImageData } from "../tools/image/enhanced-image-data";
import { ImageComparison } from "../tools/image/image-comparison";
import { ImageFilters } from "../tools/image/image-filters";
import { createRecognitionRegionImage } from "../tools/image/image-recognition";
import { loadImages } from "../tools/image/image-loader";
import { pipe } from "remeda";

const images = await loadImages(
  import.meta.glob<string>("../assets/sources/extract-lap-total-digits/*.png", { eager: true, import: `default` }),
);

const BOX = new Box(661, 245, 684, 227);

const TotalLapsRecognition = createRecognitionRegionImage(images, BOX, {
  filter: ImageFilters.blackAndWhite,
  comparison: ImageComparison.hitchhikersSSIM,
});

export function getTotalLaps(image: EnhancedImageData, putImageData?: CanvasImageData["putImageData"]): string {
  return pipe(TotalLapsRecognition.getMatch(image, BOX), (match) => {
    putImageData?.(match.value, ...BOX.putImageData());
    return match.filename;
  });
}
