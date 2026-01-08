import type { AnyArgsFunction } from "../../_core/types/any-args-function";
import type { Pixel } from "./pixel";

export type PixelFiltersFunction = (pixel: Pixel) => Pixel;

export const PixelFilters = {
  identity(): PixelFiltersFunction {
    return (pixel): Pixel => pixel;
  },
  invert(): PixelFiltersFunction {
    return (pixel: Pixel) => {
      return {
        r: 255 - pixel.r,
        g: 255 - pixel.g,
        b: 255 - pixel.b,
        a: pixel.a,
      };
    };
  },
  blackAndWhite(options: { threshold: number }): PixelFiltersFunction {
    return (pixel: Pixel) => {
      const gray = 0.2126 * pixel.r + 0.7152 * pixel.g + 0.0722 * pixel.b;
      const whiteOrBlack = gray > options.threshold ? 255 : 0;
      return {
        r: whiteOrBlack,
        g: whiteOrBlack,
        b: whiteOrBlack,
        a: pixel.a,
      };
    };
  },
  // Custom-made for shrooms detection
  shroomsHighlight(): PixelFiltersFunction {
    const blackAndWhite = PixelFilters.blackAndWhite({ threshold: 150 });
    return (pixel: Pixel) => {
      if (pixel.r > 100) {
        return pixel;
      }

      return blackAndWhite(pixel);
    };
  },
} satisfies Record<string, AnyArgsFunction<PixelFiltersFunction>>;
