import { CoinsRecognitionOptions, CoinsRegions } from "./coins-configuration";
import { mapValues, pipe } from "remeda";
import type { EnhancedImageData } from "../../image-manipulation/image/enhanced-image-data";
import { createImageRecognition } from "../../image-manipulation/image/image-recognition";
import { loadImages } from "../../image-manipulation/image/image-loader";

const images = await loadImages(
  import.meta.glob<string>("../../../assets/recognitions/normalised/coins/*", {
    eager: true,
    import: `default`,
  }),
);

const CoinsRecognition = createImageRecognition(images, CoinsRecognitionOptions);

export const Coins = {
  get(image: EnhancedImageData, putImageData?: CanvasImageData["putImageData"]): string | undefined {
    return pipe(
      CoinsRegions,
      mapValues((box) => CoinsRecognition.getMatch(image, box)),
      (matches) => {
        putImageData?.(matches.coin01.value, ...CoinsRegions.coin01.putImageData());
        putImageData?.(matches.coin10.value, ...CoinsRegions.coin10.putImageData());

        const coins = `${matches.coin10.filename.at(1)}${matches.coin01.filename.at(1)}`;

        if (Number(coins) > 20) {
          return undefined;
        }

        return coins;
      },
    );
  },
};
