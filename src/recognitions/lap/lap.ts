import { LapRecognitionOptions, LapRegion } from "./lap-configuration";
import type { EnhancedImageData } from "../../tools/image/enhanced-image-data";
import { createImageRecognition } from "../../tools/image/image-recognition";
import { loadImages } from "../../tools/image/image-loader";
import { pipe } from "remeda";

const images = await loadImages(
  import.meta.glob<string>("../../assets/recognitions/normalised/lap/*", { eager: true, import: `default` }),
);

const LapRecognition = createImageRecognition(images, LapRecognitionOptions);

export const Lap = {
  get(image: EnhancedImageData, putImageData?: CanvasImageData["putImageData"]): string {
    return pipe(LapRecognition.getMatch(image, LapRegion), (match) => {
      putImageData?.(match.value, ...LapRegion.putImageData());
      return match.filename;
    });
  },
};
