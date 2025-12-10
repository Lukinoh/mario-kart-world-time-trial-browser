import { type Image, transformImageData } from "./image-loader";
import { ImageFilters, type ImageFiltersFunction } from "./image-filters";
import { ImageSimilarity, type ImageSimilarityFunction } from "./image-similarity";
import { map, pipe } from "remeda";
import type { Box } from "../box/box";
import type { Brand } from "../../core/helpers/brand";
import { EnhancedImageData } from "./enhanced-image-data";

export interface ImageRecognitionOptions {
  filter?: ImageFiltersFunction;
  comparison?: ImageSimilarityFunction;
}

export interface MatchedImage extends Image {
  score: number;
}

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function createMutativeRecognitionImageFactory(images: Array<Image>, options?: ImageRecognitionOptions) {
  const processing = options?.filter ?? ImageFilters.identity;
  const comparison = options?.comparison ?? ImageSimilarity.hitchhikersSSIM();

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

type MutativeRecognitionImage = Brand<ReturnType<typeof createMutativeRecognitionImageFactory>>;
type MutativeRecognitionImageFactory = (
  ...args: Parameters<typeof createMutativeRecognitionImageFactory>
) => MutativeRecognitionImage;
const createMutativeRecognitionImage: MutativeRecognitionImageFactory = createMutativeRecognitionImageFactory;

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
export function createRecognitionImageFactory(images: Array<Image>, options?: ImageRecognitionOptions) {
  const { clone } = EnhancedImageData;
  const clonedImages = transformImageData(images, (imageData) => clone(imageData));
  const mutative = createMutativeRecognitionImage(clonedImages, options);

  const getMatch = (inputImage: EnhancedImageData): MatchedImage => {
    const inputImageClone = clone(inputImage);
    return mutative.getMatch(inputImageClone);
  };

  return { getMatch };
}

type RecognitionImage = Brand<ReturnType<typeof createRecognitionImageFactory>>;
type RecognitionImageFactory = (...args: Parameters<typeof createRecognitionImageFactory>) => RecognitionImage;
export const createRecognitionImage: RecognitionImageFactory = createRecognitionImageFactory;

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function createRecognitionRegionImageFactory(images: Array<Image>, region: Box, options?: ImageRecognitionOptions) {
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

type RecognitionRegionImage = Brand<ReturnType<typeof createRecognitionRegionImageFactory>>;
type RecognitionRegionImageFactory = (
  ...args: Parameters<typeof createRecognitionRegionImageFactory>
) => RecognitionRegionImage;
export const createRecognitionRegionImage: RecognitionRegionImageFactory = createRecognitionRegionImageFactory;
