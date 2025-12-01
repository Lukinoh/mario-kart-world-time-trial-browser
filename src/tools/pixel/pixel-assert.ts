import type { Pixel } from "./pixel";

export type PixelAssertFunction = (pixel: Pixel) => boolean;

export const PixelAssert = {
  isYellowish(pixel: Pixel): boolean {
    return pixel.r > 200 && pixel.g > 170 && pixel.b < 105;
  },
} satisfies Record<string, PixelAssertFunction>;
