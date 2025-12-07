import { drop, mapValues, meanBy, pipe, sort, values } from "remeda";
import { Box } from "../tools/box/box";
import type { EnhancedImageData } from "../tools/image/enhanced-image-data";
import { ImageFilters } from "../tools/image/image-filters";
import { ImageSimilarity } from "../tools/image/image-similarity";
import { createRecognitionRegionImage } from "../tools/image/image-recognition";
import { loadImages } from "../tools/image/image-loader";

const images = await loadImages(
  import.meta.glob<string>("../assets/extractors/pause/model.png", {
    eager: true,
    import: `default`,
  }),
);

// All the dots are quite similar, it would be possible to increase the surface of the box by adding the same shift to each boxes.
const BOXES = {
  menuRight1: new Box(191, 486, 208, 469),
  menuRight2: new Box(271, 486, 288, 469),
  menuRight3: new Box(351, 486, 368, 469),
  menuRight4: new Box(431, 486, 448, 469),
  menuRight5: new Box(511, 486, 528, 469),
  menuLeft1: new Box(191, 811, 208, 794),
  menuLeft2: new Box(271, 811, 288, 794),
  menuLeft3: new Box(351, 811, 368, 794),
  menuLeft4: new Box(431, 811, 448, 794),
  menuLeft5: new Box(511, 811, 528, 794),
} as const;

const PauseRecognition = createRecognitionRegionImage(images, BOXES.menuLeft2, {
  filter: ImageFilters.invert,
  comparison: ImageSimilarity.hitchhikersSSIM(),
});

export const Pause = {
  isPause(image: EnhancedImageData, putImageData?: CanvasImageData["putImageData"]): boolean {
    return pipe(
      BOXES,
      mapValues((box) => PauseRecognition.getMatch(image, box)),
      (matches) => {
        putImageData?.(matches.menuLeft1.value, ...BOXES.menuLeft1.putImageData());
        putImageData?.(matches.menuLeft2.value, ...BOXES.menuLeft2.putImageData());
        putImageData?.(matches.menuLeft3.value, ...BOXES.menuLeft3.putImageData());
        putImageData?.(matches.menuLeft4.value, ...BOXES.menuLeft4.putImageData());
        putImageData?.(matches.menuLeft5.value, ...BOXES.menuLeft5.putImageData());
        putImageData?.(matches.menuRight1.value, ...BOXES.menuRight1.putImageData());
        putImageData?.(matches.menuRight2.value, ...BOXES.menuRight2.putImageData());
        putImageData?.(matches.menuRight3.value, ...BOXES.menuRight3.putImageData());
        putImageData?.(matches.menuRight4.value, ...BOXES.menuRight4.putImageData());
        putImageData?.(matches.menuRight5.value, ...BOXES.menuRight5.putImageData());

        const mean = pipe(
          matches,
          values(),
          sort((matchA, matchB) => matchA.score - matchB.score),
          drop(2),
          meanBy((match) => match.score),
        );

        return mean > 0.6;
      },
    );
  },
};
