import { Box } from "../tools/box/box";
import type { EnhancedImageData } from "../tools/image/enhanced-image-data";
import { ImageComparison } from "../tools/image/image-comparison";
import { createRecognitionRegionImage } from "../tools/image/image-recognition";
import { loadImages } from "../tools/image/image-loader";
import { pipe } from "remeda";

const BOX = new Box(325, 1280, 680, 977);

const images = await loadImages(
  import.meta.glob<string>("../assets/extractors/track/*.png", { eager: true, import: `default` }),
);

const TrackRecognition = createRecognitionRegionImage(images, BOX, {
  comparison: ImageComparison.hitchhikersSSIM,
});

export const Track = {
  get(image: EnhancedImageData, putImageData?: CanvasImageData["putImageData"]): string {
    return pipe(TrackRecognition.getMatch(image, BOX), (match) => {
      putImageData?.(match.value, ...BOX.putImageData());
      return match.filename;
    });
  },
};
