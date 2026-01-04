import type { EnhancedImageData } from "./enhanced-image-data";
import { PixelAssert } from "../pixel/pixel-assert";

export type ImageAssertFunction = (imageData: EnhancedImageData) => boolean;

export const ImageAssert = {
  hasOneYellowishAndBlackishPixel(imageData: EnhancedImageData): boolean {
    let hasYellowish = false;
    let hasBlackish = false;

    for (let index = 0; index < imageData.pixelCount; index = index + 1) {
      const pixel = imageData.getPixel(index);

      if (PixelAssert.isYellowish(pixel)) {
        hasYellowish = true;
      }

      if (PixelAssert.isBlackish(pixel)) {
        hasBlackish = true;
      }

      if (hasYellowish && hasBlackish) {
        return true;
      }
    }

    return false;
  },
} satisfies Record<string, ImageAssertFunction>;
