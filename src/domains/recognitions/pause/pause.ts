import { PauseRecognitionOptions, PauseRegions } from "./pause-configuration";
import { drop, mapValues, meanBy, pipe, sort, values } from "remeda";
import type { DebugPutImageData } from "../../../core/domain/types/debug-put-image-data";
import type { EnhancedImageData } from "../../../tools/image/enhanced-image-data";
import { createImageRecognition } from "../../../tools/image/image-recognition";
import { loadImages } from "../../../tools/image/image-loader";

const images = await loadImages(
  import.meta.glob<string>("../../../assets/recognitions/normalised/pause/*", {
    eager: true,
    import: `default`,
  }),
);

const PauseRecognition = createImageRecognition(images, PauseRecognitionOptions);

export const Pause = {
  isPause(image: EnhancedImageData, putImageData?: DebugPutImageData): boolean {
    return pipe(
      PauseRegions,
      mapValues((box) => PauseRecognition.getMatch(image, box)),
      (matches) => {
        putImageData?.(PauseRecognitionOptions, matches.menuLeft1.value, ...PauseRegions.menuLeft1.putImageData());
        putImageData?.(PauseRecognitionOptions, matches.menuLeft2.value, ...PauseRegions.menuLeft2.putImageData());
        putImageData?.(PauseRecognitionOptions, matches.menuLeft3.value, ...PauseRegions.menuLeft3.putImageData());
        putImageData?.(PauseRecognitionOptions, matches.menuLeft4.value, ...PauseRegions.menuLeft4.putImageData());
        putImageData?.(PauseRecognitionOptions, matches.menuLeft5.value, ...PauseRegions.menuLeft5.putImageData());
        putImageData?.(PauseRecognitionOptions, matches.menuRight1.value, ...PauseRegions.menuRight1.putImageData());
        putImageData?.(PauseRecognitionOptions, matches.menuRight2.value, ...PauseRegions.menuRight2.putImageData());
        putImageData?.(PauseRecognitionOptions, matches.menuRight3.value, ...PauseRegions.menuRight3.putImageData());
        putImageData?.(PauseRecognitionOptions, matches.menuRight4.value, ...PauseRegions.menuRight4.putImageData());
        putImageData?.(PauseRecognitionOptions, matches.menuRight5.value, ...PauseRegions.menuRight5.putImageData());

        const mean = pipe(
          matches,
          values(),
          sort((matchA, matchB) => matchA.score - matchB.score),
          drop(2),
          meanBy((match) => match.score),
        );

        return mean > 0.6;
      },
    );
  },
};
