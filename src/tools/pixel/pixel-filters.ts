import type { Pixel } from "./pixel";

export type PixelFiltersFunction = (pixel: Pixel) => Pixel;

export const PixelFilters = {
  identity(pixel: Pixel): Pixel {
    return pixel;
  },
  invert(pixel: Pixel): Pixel {
    return {
      r: 255 - pixel.r,
      g: 255 - pixel.g,
      b: 255 - pixel.b,
      a: pixel.a,
    };
  },
  blackAndWhite(pixel: Pixel): Pixel {
    const gray = 0.2126 * pixel.r + 0.7152 * pixel.g + 0.0722 * pixel.b;
    const whiteOrBlack = gray > 200 ? 255 : 0;
    return {
      r: whiteOrBlack,
      g: whiteOrBlack,
      b: whiteOrBlack,
      a: pixel.a,
    };
  },
} satisfies Record<string, PixelFiltersFunction>;
