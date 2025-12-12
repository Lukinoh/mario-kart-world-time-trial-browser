import { assert, getFilename } from "../utils";
import { entries, map, pipe } from "remeda";
import { EnhancedImageData } from "./enhanced-image-data";

export interface Image {
  filename: string;
  value: EnhancedImageData;
}

export function loadImages(importDefaultGlobEager: Record<string, string>): Promise<Array<Image>> {
  return pipe(
    importDefaultGlobEager,
    entries(),
    map((paths) => loadImage(paths)),
    // oxlint-disable-next-line prefer-await-to-then catch-or-return
    (images) => Promise.all(images),
  );
}

export async function loadImage([resolvedPath, assetPath]: [string, string]): Promise<Image> {
  return {
    filename: getFilename(resolvedPath),
    value: await loadImageData(assetPath),
  };
}

// This function must be compatible with node canvas shims.
// This is the reason why, we are not using "addEventListener", and why it is important to attach the source
// after we define the onload function.
function loadImageData(path: string): Promise<EnhancedImageData> {
  const { promise, resolve } = Promise.withResolvers<EnhancedImageData>();

  const image = new Image();
  // oxlint-disable-next-line prefer-add-event-listener
  image.onload = (): void => {
    const canvas = new OffscreenCanvas(image.width, image.height);
    const context = canvas.getContext("2d");
    assert(
      context,
      "context identifier is not supported, or the canvas has already been set to a different context mode",
    );
    context.drawImage(image, 0, 0);
    resolve(EnhancedImageData.from(context.getImageData(0, 0, image.width, image.height)));
  };
  image.src = path;

  return promise;
}
