import { TrackRecognitionOptions, TrackRegion } from "./track-configuration";
import type { DebugPutImageData } from "../../../core/domain/types/debug-put-image-data";
import type { EnhancedImageData } from "../../image-manipulation/image/enhanced-image-data";
import { createImageRecognition } from "../../image-manipulation/image/image-recognition";
import { loadImages } from "../../image-manipulation/image/image-loader";
import { pipe } from "remeda";

const images = await loadImages(
  import.meta.glob<string>("../../../assets/recognitions/normalised/track/*", { eager: true, import: `default` }),
);

const TrackRecognition = createImageRecognition(images, TrackRecognitionOptions);

export const Track = {
  get(image: EnhancedImageData, putImageData?: DebugPutImageData): string {
    return pipe(TrackRecognition.getMatch(image, TrackRegion), (match) => {
      putImageData?.(TrackRecognitionOptions, match.value, ...TrackRegion.putImageData());
      // As the name of the file is used to get the track, and on Windows you cannot have a filename with ?, a trick has been used.
      // Ideally, we should not rely on the filename.
      return match.filename.replace("؟", "?");
    });
  },
};
