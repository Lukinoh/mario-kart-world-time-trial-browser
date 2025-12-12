import { TimeRecognitionOptions, TimeRegions } from "./time-configuration";
import { compile, format, parse } from "date-and-time";
import { mapValues, pipe, values } from "remeda";
import { EnhancedImageData } from "../../tools/image/enhanced-image-data";
import { ImageAssert } from "../../tools/image/image-assert";
import { createImageRecognition } from "../../tools/image/image-recognition";
import { loadImages } from "../../tools/image/image-loader";

const compiledTime = compile("m:ss.SSS");

const images = await loadImages(
  import.meta.glob<string>("../../assets/recognitions/normalised/time/*", {
    eager: true,
    import: `default`,
  }),
);

const TimeRecognition = createImageRecognition(images, TimeRecognitionOptions);

export const Time = {
  get(image: EnhancedImageData, putImageData?: CanvasImageData["putImageData"]): string {
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
        return `${matches.minute.filename}:${matches.second10.filename}${matches.second01.filename}.${matches.milisecond100.filename}${matches.milisecond010.filename}${matches.milisecond001.filename}`;
      },
    );
  },
  isYellowish(image: EnhancedImageData): boolean {
    return pipe(
      TimeRegions,
      mapValues((box) => ImageAssert.hasOneYellowishPixel(EnhancedImageData.extract(image, box))),
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
