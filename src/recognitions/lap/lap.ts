import { LapRecognitionOptions, LapRegion } from "./lap-configuration";
import type { DebugPutImageData } from "../../core/domain/types/debug-put-image-data";
import type { EnhancedImageData } from "../../tools/image/enhanced-image-data";
import { createImageRecognition } from "../../tools/image/image-recognition";
import { loadImages } from "../../tools/image/image-loader";
import { pipe } from "remeda";

const images = await loadImages(
  import.meta.glob<string>("../../assets/recognitions/normalised/lap/*", { eager: true, import: `default` }),
);

const LapRecognition = createImageRecognition(images, LapRecognitionOptions);

export const Lap = {
  get(image: EnhancedImageData, putImageData?: DebugPutImageData): string {
    return pipe(LapRecognition.getMatch(image, LapRegion), (match) => {
      putImageData?.(LapRecognitionOptions, match.value, ...LapRegion.putImageData());
      return match.filename;
    });
  },
};
