import { TimeRecognitionOptions, TimeRegions } from "./time-configuration";
import { mapValues, pipe, values } from "remeda";
import { EnhancedImageData } from "../../image-manipulation/image/enhanced-image-data";
import { ImageAssert } from "../../image-manipulation/image/image-assert";
import { createImageRecognition } from "../../image-manipulation/image/image-recognition";
import { loadImages } from "../../image-manipulation/image/image-loader";

const images = await loadImages(
  import.meta.glob<string>("../../../assets/recognitions/normalised/time/*", {
    eager: true,
    import: `default`,
  }),
);

const TimeRecognition = createImageRecognition(images, TimeRecognitionOptions);

export const Time = {
  get(image: EnhancedImageData, putImageData?: CanvasImageData["putImageData"]): string | undefined {
    return pipe(
      TimeRegions,
      mapValues((box) => TimeRecognition.getMatch(image, box)),
      (matches) => {
        putImageData?.(matches.minute.value, ...TimeRegions.minute.putImageData());
        putImageData?.(matches.second10.value, ...TimeRegions.second10.putImageData());
        putImageData?.(matches.second01.value, ...TimeRegions.second01.putImageData());
        putImageData?.(matches.milisecond100.value, ...TimeRegions.milisecond100.putImageData());
        putImageData?.(matches.milisecond010.value, ...TimeRegions.milisecond010.putImageData());
        putImageData?.(matches.milisecond001.value, ...TimeRegions.milisecond001.putImageData());

        const seconds = `${matches.second10.filename}${matches.second01.filename}`;
        if (Number(seconds) > 59) {
          return undefined;
        }

        return `${matches.minute.filename}:${seconds}.${matches.milisecond100.filename}${matches.milisecond010.filename}${matches.milisecond001.filename}`;
      },
    );
  },
  isYellow(image: EnhancedImageData): boolean {
    return pipe(
      TimeRegions,
      mapValues((box) => ImageAssert.hasOneYellowishAndBlackishPixel(EnhancedImageData.extract(image, box))),
      values(),
      (values) => values.every(Boolean),
    );
  },
};
