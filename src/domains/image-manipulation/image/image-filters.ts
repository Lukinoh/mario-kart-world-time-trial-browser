import type { AnyArgsFunction } from "../../_core/types/any-args-function";
import type { EnhancedImageData } from "./enhanced-image-data";
import { PixelFilters } from "../pixel/pixel-filters";

export type ImageFiltersFunction = (imageData: EnhancedImageData) => void;

export const ImageFilters = {
  identity(): ImageFiltersFunction {
    return () => {
      // Nothing to do
    };
  },
  invert(): ImageFiltersFunction {
    return (imageData: EnhancedImageData): void => {
      imageData.applyPixelFilter(PixelFilters.invert());
    };
  },
  blackAndWhite(options: { threshold: number }): ImageFiltersFunction {
    return (imageData: EnhancedImageData): void => {
      imageData.applyPixelFilter(PixelFilters.blackAndWhite(options));
    };
  },
} satisfies Record<string, AnyArgsFunction<ImageFiltersFunction>>;
