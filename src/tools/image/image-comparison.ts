import type { EnhancedImageData } from "./enhanced-image-data";
import { gmsd } from "@blazediff/gmsd";
import { hitchhikersSSIM } from "@blazediff/ssim/hitchhikers-ssim";
import { msssim } from "@blazediff/ssim/msssim";
import { ssim } from "@blazediff/ssim/ssim";

export type ImageComparisonFunction = (imageData1: EnhancedImageData, imageData2: EnhancedImageData) => number;

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
  // isYellowish(image: ImageHandler) {
  //     let yellowPixel = 0;
  //
  //     for (let i = 0; i < image.pixelCount; i++) {
  //         const pixel = image.getPixel(i);
  //         if (pixel.r > 200 && pixel.g > 170 && pixel.b < 105) {
  //             yellowPixel++;
  //         }
  //         if (yellowPixel > (image.pixelCount / 3)) {
  //             return true
  //         }
  //     }
  //
  //     return false;
  // }
} satisfies Record<string, ImageComparisonFunction>;
