import { EnhancedImageData } from "../../image-manipulation/image/enhanced-image-data";
import { ImageFilters } from "../../image-manipulation/image/image-filters";
import type { ImageNormaliserOptions } from "../../image-manipulation/image/image-normaliser";

export function invertIdentity(putImageData: CanvasImageData["putImageData"]) {
  return (imageNormaliserOptions: ImageNormaliserOptions, imageData: ImageData, dx: number, dy: number): void => {
    let image = EnhancedImageData.from(imageData);
    if (imageNormaliserOptions.filter === ImageFilters.identity) {
      image = EnhancedImageData.clone(imageData);
      ImageFilters.invert(image);
    }

    putImageData(image, dx, dy);
  };
}
