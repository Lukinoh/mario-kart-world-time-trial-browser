import type { AnyArgsFunction } from "../../_core/types/any-args-function";
import type { EnhancedImageData } from "./enhanced-image-data";

export type ImageSimilarityFunction = (imageData1: EnhancedImageData, imageData2: EnhancedImageData) => number;

export const ImageSimilarity = {
  mse(): ImageSimilarityFunction {
    return (imageData1, imageData2) => {
      let squareError = 0;
      const { pixelCount } = imageData1;

      for (let position = 0; position < pixelCount; position = position + 1) {
        const color1 = imageData1.getPixel(position);
        const color2 = imageData2.getPixel(position);
        const rDiff = color1.r - color2.r;
        const gDiff = color1.g - color2.g;
        const bDiff = color1.b - color2.b;

        squareError = squareError + rDiff * rDiff + gDiff * gDiff + bDiff * bDiff;
      }

      const maxValue = 255 ** 2 * 3 * pixelCount;
      return 1 - squareError / maxValue;
    };
  },
} satisfies Record<string, AnyArgsFunction<ImageSimilarityFunction>>;
