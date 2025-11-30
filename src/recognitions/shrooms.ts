import { Box } from "../tools/box/box";
import type { EnhancedImageData } from "../tools/image/enhanced-image-data";
import { ImageComparison } from "../tools/image/image-comparison";
import { ImageFilters } from "../tools/image/image-filters";
import { createRecognitionRegionImage } from "../tools/image/image-recognition";
import { loadImages } from "../tools/image/image-loader";
import { pipe } from "remeda";

const images = await loadImages(
  import.meta.glob<string>("../assets/extractors/shrooms/*.png", { eager: true, import: `default` }),
);

const BOX = new Box(43, 153, 143, 43);

const ShroomsRecognition = createRecognitionRegionImage(images, BOX, {
  filter: ImageFilters.blackAndWhite,
  comparison: ImageComparison.hitchhikersSSIM,
});

export const Shrooms = {
  get(image: EnhancedImageData, putImageData?: CanvasImageData["putImageData"]): string {
    return pipe(ShroomsRecognition.getMatch(image, BOX), (match) => {
      putImageData?.(match.value, ...BOX.putImageData());
      return match.filename;
    });
  },
};
