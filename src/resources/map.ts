import { Box } from "../tools/box/box";
import type { EnhancedImageData } from "../tools/image/enhanced-image-data";
import { ImageComparison } from "../tools/image/image-comparison";
import { createRecognitionRegionImage } from "../tools/image/image-recognition";
import { loadImages } from "../tools/image/image-loader";
import { pipe } from "remeda";

const BOX = new Box(376, 1280, 667, 1060);

const images = await loadImages(
  import.meta.glob<string>("../assets/sources/extract-map/*.png", { eager: true, import: `default` }),
);

const MapRecognition = createRecognitionRegionImage(images, BOX, {
  comparison: ImageComparison.hitchhikersSSIM,
});

export function getMap(image: EnhancedImageData, context?: CanvasRenderingContext2D): string {
  return pipe(MapRecognition.getMatch(image, BOX), (match) => {
    context?.putImageData(match.value, ...BOX.putImageData());
    return match.filename;
  });
}
