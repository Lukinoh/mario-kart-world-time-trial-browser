import type { EnhancedImageData } from "./enhanced-image-data";
import { PixelAssert } from "../pixel/pixel-assert";

export type ImageAssertFunction = (imageData: EnhancedImageData) => boolean;

export const ImageAssert = {
  hasOneYellowishAndBlackishPixel(imageData: EnhancedImageData): boolean {
    const { pixelCount } = imageData;
    let hasYellowish = false;
    let hasBlackish = false;

    for (let position = 0; position < pixelCount; position = position + 1) {
      const pixel = imageData.getPixel(position);

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
