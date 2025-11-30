import type { EnhancedImageData } from "./enhanced-image-data";
import { PixelComparison } from "../pixel/pixel-comparison";
import { gmsd } from "@blazediff/gmsd";
import { hitchhikersSSIM } from "@blazediff/ssim/hitchhikers-ssim";
import { msssim } from "@blazediff/ssim/msssim";
import { ssim } from "@blazediff/ssim/ssim";

export type ImageSimilarityFunction = (imageData1: EnhancedImageData, imageData2: EnhancedImageData) => number;
export type ImageBooleanFunction = (imageData: EnhancedImageData) => boolean;

export const ImageComparison = {
  gmsd(imageData1: EnhancedImageData, imageData2: EnhancedImageData): number {
    return 1 - gmsd(imageData1.data, imageData2.data, undefined, imageData1.width, imageData1.height);
  },
  ssim(imageData1: EnhancedImageData, imageData2: EnhancedImageData): number {
    return ssim(imageData1.data, imageData2.data, undefined, imageData1.width, imageData1.height);
  },
  msssim(imageData1: EnhancedImageData, imageData2: EnhancedImageData): number {
    return msssim(imageData1.data, imageData2.data, undefined, imageData1.width, imageData1.height);
  },
  hitchhikersSSIM(imageData1: EnhancedImageData, imageData2: EnhancedImageData): number {
    return hitchhikersSSIM(imageData1.data, imageData2.data, undefined, imageData1.width, imageData1.height, {
      // Set 3 lap from 1 to 2 is not correct
      windowSize: 3,
      // covPooling: false
    });
  },
  hasOneYellowishPixel(imageData: EnhancedImageData): boolean {
    for (let index = 0; index < imageData.pixelCount; index = index + 1) {
      const pixel = imageData.getPixel(index);

      if (PixelComparison.isYellowish(pixel)) {
        return true;
      }
    }

    return false;
  },
} satisfies Record<string, ImageSimilarityFunction | ImageBooleanFunction>;
