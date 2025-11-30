import type { Pixel } from "./pixel";

export type PixelComparison = (pixel: Pixel) => boolean;

export const PixelComparison = {
  isYellowish(pixel: Pixel): boolean {
    return pixel.r > 200 && pixel.g > 170 && pixel.b < 105;
  },
} satisfies Record<string, PixelComparison>;
