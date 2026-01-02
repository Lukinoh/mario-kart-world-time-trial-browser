import { CoinsRecognitionOptions, CoinsRegions } from "./coins-configuration";
import { mapValues, pipe } from "remeda";
import type { DebugPutImageData } from "../../core/domain/types/debug-put-image-data";
import type { EnhancedImageData } from "../../tools/image/enhanced-image-data";
import { createImageRecognition } from "../../tools/image/image-recognition";
import { loadImages } from "../../tools/image/image-loader";

const images = await loadImages(
  import.meta.glob<string>("../../assets/recognitions/normalised/coins/*", {
    eager: true,
    import: `default`,
  }),
);

const CoinsRecognition = createImageRecognition(images, CoinsRecognitionOptions);

export const Coins = {
  get(image: EnhancedImageData, putImageData?: DebugPutImageData): string {
    return pipe(
      CoinsRegions,
      mapValues((box) => CoinsRecognition.getMatch(image, box)),
      (matches) => {
        putImageData?.(CoinsRecognitionOptions, matches.coin01.value, ...CoinsRegions.coin01.putImageData());
        putImageData?.(CoinsRecognitionOptions, matches.coin10.value, ...CoinsRegions.coin10.putImageData());
        return `${matches.coin10.filename.at(1)}${matches.coin01.filename.at(1)}`;
      },
    );
  },
};
