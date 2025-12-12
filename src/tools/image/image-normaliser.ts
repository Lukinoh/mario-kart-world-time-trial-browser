import type { Box } from "../box/box";
import { EnhancedImageData } from "./enhanced-image-data";
import type { Image } from "./image-loader";
import type { ImageFiltersFunction } from "./image-filters";
import { pipe } from "remeda";

export interface ImageNormaliserOptions {
  region: Box;
  filter: ImageFiltersFunction;
}

export function normaliseImageData(imageData: EnhancedImageData, options: ImageNormaliserOptions): EnhancedImageData {
  return pipe(
    imageData,
    (image) => EnhancedImageData.extract(image, options.region),
    (image) => {
      // oxlint-disable-next-line no-array-callback-reference false-positive
      options.filter(image);
      return image;
    },
  );
}

export function normaliseImage(image: Image, options: ImageNormaliserOptions): Image {
  return {
    ...image,
    value: normaliseImageData(image.value, options),
  };
}
