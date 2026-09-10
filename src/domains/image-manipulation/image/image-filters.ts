import type { AnyArgsFunction } from "../../_core/types/any-args-function";
import type { EnhancedImageData } from "./enhanced-image-data";
import { PixelFilters } from "../pixel/pixel-filters";
import type { PixelRGB } from "../pixel/pixel";
import { kmeans } from "ml-kmeans";

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
  shroomsHighlight(): ImageFiltersFunction {
    return (imageData: EnhancedImageData): void => {
      imageData.applyPixelFilter(PixelFilters.shroomsHighlight());
    };
  },
  kMeans(options: { k: number; maxIterations: number }): ImageFiltersFunction {
    const { k, maxIterations } = options;

    return (imageData: EnhancedImageData): void => {
      const { pixelCount } = imageData;

      // oxlint-disable-next-line unicorn/no-new-array For perf reason
      const data2d = new Array<PixelRGB>(pixelCount);
      for (let position = 0; position < pixelCount; position = position + 1) {
        data2d[position] = imageData.getPixelRGB(position);
      }

      // oxlint-disable-next-line unicorn/no-new-array For perf reason
      const centers = new Array<PixelRGB>(k);
      const step = Math.floor(pixelCount / k);
      for (let cIndex = 0; cIndex < k; cIndex = cIndex + 1) {
        const position = cIndex * step;
        centers[cIndex] = data2d[position];
      }

      const result = kmeans(data2d, k, {
        initialization: centers,
        maxIterations: maxIterations,
      });

      const roundedCentroids = result.centroids.map((centroid) => ({
        r: Math.round(centroid[0]),
        g: Math.round(centroid[1]),
        b: Math.round(centroid[2]),
        a: 255,
      }));

      for (let position = 0; position < pixelCount; position = position + 1) {
        const centroid = roundedCentroids[result.clusters[position]];
        imageData.setPixel(position, centroid);
      }
    };
  },
} satisfies Record<string, AnyArgsFunction<ImageFiltersFunction>>;
