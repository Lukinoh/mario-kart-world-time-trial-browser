import { type GmsdOptions, gmsd } from "@blazediff/gmsd";
import { type HitchhikersSsimOptions, hitchhikersSSIM } from "@blazediff/ssim/hitchhikers-ssim";
import { type MsssimOptions, msssim } from "@blazediff/ssim/msssim";
import { type SsimOptionsExtended, ssim } from "@blazediff/ssim/ssim";
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
} satisfies Record<string, (options?: object) => ImageSimilarityFunction>;
