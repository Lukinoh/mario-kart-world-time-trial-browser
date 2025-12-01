import { Box } from "../tools/box/box";
import type { EnhancedImageData } from "../tools/image/enhanced-image-data";
import { ImageFilters } from "../tools/image/image-filters";
import { ImageSimilarity } from "../tools/image/image-similarity";
import { createRecognitionRegionImage } from "../tools/image/image-recognition";
import { loadImages } from "../tools/image/image-loader";
import { pipe } from "remeda";

const images = await loadImages(
  import.meta.glob<string>("../assets/extractors/laps/*.png", { eager: true, import: `default` }),
);

const BOX = new Box(661, 245, 684, 227);

const LapsRecognition = createRecognitionRegionImage(images, BOX, {
  filter: ImageFilters.blackAndWhite,
  comparison: ImageSimilarity.hitchhikersSSIM(),
});

export const Laps = {
  get(image: EnhancedImageData, putImageData?: CanvasImageData["putImageData"]): string {
    return pipe(LapsRecognition.getMatch(image, BOX), (match) => {
      putImageData?.(match.value, ...BOX.putImageData());
      return match.filename;
    });
  },
};
