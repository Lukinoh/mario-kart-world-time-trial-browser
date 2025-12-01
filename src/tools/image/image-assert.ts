import type { EnhancedImageData } from "./enhanced-image-data";
import { PixelAssert } from "../pixel/pixel-assert";

export type ImageAssertFunction = (imageData: EnhancedImageData) => boolean;

export const ImageAssert = {
  hasOneYellowishPixel(imageData: EnhancedImageData): boolean {
    for (let index = 0; index < imageData.pixelCount; index = index + 1) {
      const pixel = imageData.getPixel(index);

      if (PixelAssert.isYellowish(pixel)) {
        return true;
      }
    }

    return false;
  },
} satisfies Record<string, ImageAssertFunction>;
