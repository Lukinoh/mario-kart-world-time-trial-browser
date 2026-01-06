import { type GmsdOptions, gmsd } from "@blazediff/gmsd";
import { type HitchhikersSsimOptions, hitchhikersSSIM } from "@blazediff/ssim/hitchhikers-ssim";
import { type MsssimOptions, msssim } from "@blazediff/ssim/msssim";
import { type SsimOptionsExtended, ssim } from "@blazediff/ssim/ssim";
import type { AnyArgsFunction } from "../../_core/types/any-args-function";
import type { EnhancedImageData } from "./enhanced-image-data";

export type ImageSimilarityFunction = (imageData1: EnhancedImageData, imageData2: EnhancedImageData) => number;

export const ImageSimilarity = {
  gmsd(options?: GmsdOptions): ImageSimilarityFunction {
    return (imageData1, imageData2) =>
      1 - gmsd(imageData1.data, imageData2.data, undefined, imageData1.width, imageData1.height, options);
  },
  ssim(options?: SsimOptionsExtended): ImageSimilarityFunction {
    return (imageData1, imageData2) =>
      ssim(imageData1.data, imageData2.data, undefined, imageData1.width, imageData1.height, options);
  },
  msssim(options?: MsssimOptions): ImageSimilarityFunction {
    return (imageData1, imageData2) =>
      msssim(imageData1.data, imageData2.data, undefined, imageData1.width, imageData1.height, options);
  },
  hitchhikersSSIM(options?: HitchhikersSsimOptions): ImageSimilarityFunction {
    return (imageData1, imageData2) =>
      hitchhikersSSIM(imageData1.data, imageData2.data, undefined, imageData1.width, imageData1.height, {
        windowSize: 3,
        ...options,
      });
  },
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
