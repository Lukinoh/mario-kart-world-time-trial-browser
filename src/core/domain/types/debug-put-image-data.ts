import type { ImageNormaliserOptions } from "../../../domains/image-manipulation/image/image-normaliser";

export type DebugPutImageData = (
  imageNormaliserOptions: ImageNormaliserOptions,
  imageData: ImageData,
  dx: number,
  dy: number,
) => ReturnType<CanvasImageData["putImageData"]>;
