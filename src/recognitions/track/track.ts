import { TrackRecognitionOptions, TrackRegion } from "./track-configuration";
import type { DebugPutImageData } from "../../core/domain/types/debug-put-image-data";
import type { EnhancedImageData } from "../../tools/image/enhanced-image-data";
import { createImageRecognition } from "../../tools/image/image-recognition";
import { loadImages } from "../../tools/image/image-loader";
import { pipe } from "remeda";

const images = await loadImages(
  import.meta.glob<string>("../../assets/recognitions/normalised/track/*", { eager: true, import: `default` }),
);

const TrackRecognition = createImageRecognition(images, TrackRecognitionOptions);

export const Track = {
  get(image: EnhancedImageData, putImageData?: DebugPutImageData): string {
    return pipe(TrackRecognition.getMatch(image, TrackRegion), (match) => {
      putImageData?.(TrackRecognitionOptions, match.value, ...TrackRegion.putImageData());
      return match.filename;
    });
  },
};
