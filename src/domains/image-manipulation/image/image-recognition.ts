import { type ImageNormaliserOptions, normaliseImageData } from "./image-normaliser";
import { map, pipe } from "remeda";
import type { Box } from "../box/box";
import type { Brand } from "../../_core/utils/brand";
import type { EnhancedImageData } from "./enhanced-image-data";
import type { Image } from "./image-loader";
import type { ImageSimilarityFunction } from "./image-similarity";

export interface MatchedImage extends Image {
  score: number;
}

export interface ImageRecognitionOptions extends ImageNormaliserOptions {
  identifier: string;
  comparison: ImageSimilarityFunction;
}

/**
 * Be careful, if the options.filter does not create a new EnhancedImageData, the function is mutative.
 * @param normalisedImages A set of images that have been already preprocessed (= extract, and filter already applied)
 * @param options
 */
// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function createImageRecognitionFactory(normalisedImages: Array<Image>, options: ImageRecognitionOptions) {
  const getMatch = (inputImageData: EnhancedImageData, box?: Box): MatchedImage => {
    const normalisedInputImageData = normaliseImageData(inputImageData, {
      ...options,
      region: box ?? options.region,
    });
    return pipe(
      normalisedImages,
      map((image) => ({
        ...image,
        score: options.comparison(normalisedInputImageData, image.value),
      })),
      (images) => images.reduce((best, current) => (current.score > best.score ? current : best)),
    );
  };

  return { getMatch };
}

type ImageRecognition = Brand<ReturnType<typeof createImageRecognitionFactory>>;
type ImageRecognitionFactory = (...args: Parameters<typeof createImageRecognitionFactory>) => ImageRecognition;
export const createImageRecognition: ImageRecognitionFactory = createImageRecognitionFactory;
