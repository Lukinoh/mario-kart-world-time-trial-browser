import { LapsRecognitionOptions, LapsRegion } from "./laps-configuration";
import type { EnhancedImageData } from "../../tools/image/enhanced-image-data";
import { createImageRecognition } from "../../tools/image/image-recognition";
import { loadImages } from "../../tools/image/image-loader";
import { pipe } from "remeda";

const images = await loadImages(
  import.meta.glob<string>("../../assets/recognitions/normalised/laps/*", { eager: true, import: `default` }),
);

const LapsRecognition = createImageRecognition(images, LapsRecognitionOptions);

export const Laps = {
  get(image: EnhancedImageData, putImageData?: CanvasImageData["putImageData"]): string {
    return pipe(LapsRecognition.getMatch(image, LapsRegion), (match) => {
      putImageData?.(match.value, ...LapsRegion.putImageData());
      return match.filename;
    });
  },
};
