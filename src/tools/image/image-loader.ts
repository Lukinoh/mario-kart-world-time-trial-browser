import { assert, getFilename } from "../utils";
import { entries, map, pipe } from "remeda";
import { EnhancedImageData } from "./enhanced-image-data";

export interface Image {
  filename: string;
  value: EnhancedImageData;
}

export function loadImage(path: string): Promise<EnhancedImageData> {
  const { promise, resolve } = Promise.withResolvers<EnhancedImageData>();

  const image = new Image();
  image.src = path;
  image.addEventListener("load", (): void => {
    const canvas = new OffscreenCanvas(image.width, image.height);
    const context = canvas.getContext("2d");
    assert(
      context,
      "context identifier is not supported, or the canvas has already been set to a different context mode",
    );
    context.drawImage(image, 0, 0);
    resolve(EnhancedImageData.from(context.getImageData(0, 0, image.width, image.height)));
  });

  return promise;
}

export function loadImages(importDefaultGlobEager: Record<string, string>): Promise<Array<Image>> {
  return pipe(
    importDefaultGlobEager,
    entries(),
    map(async ([resolvedPath, assetPath]) => ({
      filename: getFilename(resolvedPath),
      value: await loadImage(assetPath),
    })),
    // oxlint-disable-next-line prefer-await-to-then catch-or-return
    (images) => Promise.all(images),
  );
}

export function transformImageData(
  images: Array<Image>,
  apply: (imageData: EnhancedImageData) => EnhancedImageData,
): Array<Image> {
  return images.map((image) => ({
    ...image,
    value: apply(image.value),
  }));
}
