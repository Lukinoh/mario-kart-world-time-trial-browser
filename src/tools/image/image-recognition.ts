import { type Image, transformImageData } from "./image-loader";
import { ImageComparison, type ImageSimilarityFunction } from "./image-comparison";
import { ImageFilters, type ImageFiltersFunction } from "./image-filters";
import { map, pipe } from "remeda";
import type { Box } from "../box/box";
import { EnhancedImageData } from "./enhanced-image-data";

export interface ImageRecognitionOptions {
  filter?: ImageFiltersFunction;
  comparison?: ImageSimilarityFunction;
}

export interface MatchedImage extends Image {
  score: number;
}

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function createMutativeRecognitionImage(images: Array<Image>, options?: ImageRecognitionOptions) {
  const processing = options?.filter ?? ImageFilters.identity;
  const comparison = options?.comparison ?? ImageComparison.hitchhikersSSIM;

  images.forEach((image) => {
    processing(image.value);
  });

  const getMatch = (inputImage: EnhancedImageData): MatchedImage => {
    processing(inputImage);
    return pipe(
      images,
      map((image) => ({
        ...image,
        score: comparison(inputImage, image.value),
      })),
      // oxlint-disable-next-line no-array-reduce
      (images) => images.reduce((best, current) => (current.score > best.score ? current : best)),
    );
  };

  return { getMatch };
}

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
export function createRecognitionImage(images: Array<Image>, options?: ImageRecognitionOptions) {
  const { clone } = EnhancedImageData;
  const clonedImages = transformImageData(images, (imageData) => clone(imageData));
  const mutative = createMutativeRecognitionImage(clonedImages, options);

  const getMatch = (inputImage: EnhancedImageData): MatchedImage => {
    const inputImageClone = clone(inputImage);
    return mutative.getMatch(inputImageClone);
  };

  return { getMatch };
}

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
export function createRecognitionRegionImage(images: Array<Image>, region: Box, options?: ImageRecognitionOptions) {
  const extractRegion = (imageData: EnhancedImageData, region: Box): EnhancedImageData =>
    EnhancedImageData.extract(imageData, region);
  const regionImages = transformImageData(images, (imageData) => extractRegion(imageData, region));
  const mutative = createMutativeRecognitionImage(regionImages, options);

  const getMatch = (inputImage: EnhancedImageData, region: Box): MatchedImage => {
    const inputRegionImage = extractRegion(inputImage, region);
    return mutative.getMatch(inputRegionImage);
  };

  return { getMatch };
}
