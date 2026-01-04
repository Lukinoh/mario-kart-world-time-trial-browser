import type { EnhancedImageData } from "./enhanced-image-data";
import { PixelFilters } from "../pixel/pixel-filters";

export type ImageFiltersFunction = (imageData: EnhancedImageData) => void;

export const ImageFilters = {
  identity(_imageData: EnhancedImageData): void {
    // Nothing to do
  },
  invert(imageData: EnhancedImageData): void {
    imageData.applyPixelFilter(PixelFilters.invert);
  },
  blackAndWhite(imageData: EnhancedImageData): void {
    imageData.applyPixelFilter(PixelFilters.blackAndWhite);
  },
} satisfies Record<string, ImageFiltersFunction>;
