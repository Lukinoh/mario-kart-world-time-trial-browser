import { TimeRecognitionOptions, TimeRegions } from "./time-configuration";
import { compile, format, parse } from "date-and-time";
import { mapValues, pipe, values } from "remeda";
import type { DebugPutImageData } from "../../../core/domain/types/debug-put-image-data";
import { EnhancedImageData } from "../../image-manipulation/image/enhanced-image-data";
import { ImageAssert } from "../../image-manipulation/image/image-assert";
import { createImageRecognition } from "../../image-manipulation/image/image-recognition";
import { loadImages } from "../../image-manipulation/image/image-loader";

const compiledTime = compile("m:ss.SSS");

const images = await loadImages(
  import.meta.glob<string>("../../../assets/recognitions/normalised/time/*", {
    eager: true,
    import: `default`,
  }),
);

const TimeRecognition = createImageRecognition(images, TimeRecognitionOptions);

export const Time = {
  get(image: EnhancedImageData, putImageData?: DebugPutImageData): string {
    return pipe(
      TimeRegions,
      mapValues((box) => TimeRecognition.getMatch(image, box)),
      (matches) => {
        putImageData?.(TimeRecognitionOptions, matches.minute.value, ...TimeRegions.minute.putImageData());
        putImageData?.(TimeRecognitionOptions, matches.second10.value, ...TimeRegions.second10.putImageData());
        putImageData?.(TimeRecognitionOptions, matches.second01.value, ...TimeRegions.second01.putImageData());
        putImageData?.(
          TimeRecognitionOptions,
          matches.milisecond100.value,
          ...TimeRegions.milisecond100.putImageData(),
        );
        putImageData?.(
          TimeRecognitionOptions,
          matches.milisecond010.value,
          ...TimeRegions.milisecond010.putImageData(),
        );
        putImageData?.(
          TimeRecognitionOptions,
          matches.milisecond001.value,
          ...TimeRegions.milisecond001.putImageData(),
        );
        return `${matches.minute.filename}:${matches.second10.filename}${matches.second01.filename}.${matches.milisecond100.filename}${matches.milisecond010.filename}${matches.milisecond001.filename}`;
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
  parse(time: string): number {
    return parse(time, compiledTime).getTime();
  },
  format(timestamp: number): string {
    return format(new Date(timestamp), compiledTime);
  },
};
