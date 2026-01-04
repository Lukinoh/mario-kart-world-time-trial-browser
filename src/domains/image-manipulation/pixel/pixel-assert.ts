import type { Pixel } from "./pixel";

export type PixelAssertFunction = (pixel: Pixel) => boolean;

export const PixelAssert = {
  isYellowish(pixel: Pixel): boolean {
    return pixel.r > 200 && pixel.g > 170 && pixel.b < 105;
  },
  isBlackish(pixel: Pixel): boolean {
    return pixel.r < 51 && pixel.g < 51 && pixel.b < 51;
  },
} satisfies Record<string, PixelAssertFunction>;
