import { compile, format, parse } from "date-and-time";
import { mapValues, pipe, values } from "remeda";
import { Box } from "../tools/box/box";
import { EnhancedImageData } from "../tools/image/enhanced-image-data";
import { ImageComparison } from "../tools/image/image-comparison";
import { ImageFilters } from "../tools/image/image-filters";
import { createRecognitionRegionImage } from "../tools/image/image-recognition";
import { loadImages } from "../tools/image/image-loader";

const images = await loadImages(
  import.meta.glob<string>("../assets/extractors/time/*.png", { eager: true, import: `default` }),
);

const BOXES = {
  minute: new Box(37, 1065, 71, 1038),
  second10: new Box(37, 1113, 71, 1086),
  second01: new Box(37, 1140, 71, 1113),
  milisecond100: new Box(37, 1185, 71, 1158),
  milisecond010: new Box(37, 1212, 71, 1185),
  milisecond001: new Box(37, 1239, 71, 1212),
} as const;

const TimeRecognition = createRecognitionRegionImage(images, BOXES.second01, {
  filter: ImageFilters.blackAndWhite,
  comparison: ImageComparison.hitchhikersSSIM,
});

const compiledTime = compile("m:ss.SSS");

export const Time = {
  get(image: EnhancedImageData, putImageData?: CanvasImageData["putImageData"]): string {
    return pipe(
      BOXES,
      mapValues((box) => TimeRecognition.getMatch(image, box)),
      (matches) => {
        putImageData?.(matches.minute.value, ...BOXES.minute.putImageData());
        putImageData?.(matches.second10.value, ...BOXES.second10.putImageData());
        putImageData?.(matches.second01.value, ...BOXES.second01.putImageData());
        putImageData?.(matches.milisecond100.value, ...BOXES.milisecond100.putImageData());
        putImageData?.(matches.milisecond010.value, ...BOXES.milisecond010.putImageData());
        putImageData?.(matches.milisecond001.value, ...BOXES.milisecond001.putImageData());
        return `${matches.minute.filename}:${matches.second10.filename}${matches.second01.filename}.${matches.milisecond100.filename}${matches.milisecond010.filename}${matches.milisecond001.filename}`;
      },
    );
  },
  isYellowish(image: EnhancedImageData): boolean {
    return pipe(
      BOXES,
      mapValues((box) => ImageComparison.hasOneYellowishPixel(EnhancedImageData.extract(image, box))),
      values(),
      (values) => values.every(Boolean),
    );
  },
  parse(time: string): Date {
    return parse(time, compiledTime);
  },
  format(timestamp: number): string {
    return format(new Date(timestamp), compiledTime);
  },
};
