import { ShroomsRecognitionOptions, ShroomsRegion } from "./shrooms-configuration";
import type { DebugPutImageData } from "../../../core/domain/types/debug-put-image-data";
import type { EnhancedImageData } from "../../../tools/image/enhanced-image-data";
import { createImageRecognition } from "../../../tools/image/image-recognition";
import { loadImages } from "../../../tools/image/image-loader";
import { pipe } from "remeda";

const images = await loadImages(
  import.meta.glob<string>("../../../assets/recognitions/normalised/shrooms/*", { eager: true, import: `default` }),
);

const ShroomsRecognition = createImageRecognition(images, ShroomsRecognitionOptions);

export const Shrooms = {
  get(image: EnhancedImageData, putImageData?: DebugPutImageData): string {
    return pipe(ShroomsRecognition.getMatch(image, ShroomsRegion), (match) => {
      if (match.score < 0.3) {
        return "0";
      }
      putImageData?.(ShroomsRecognitionOptions, match.value, ...ShroomsRegion.putImageData());
      return `${match.filename.at(0)}`;
    });
  },
};
