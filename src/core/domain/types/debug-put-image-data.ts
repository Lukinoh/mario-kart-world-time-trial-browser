import type { ImageNormaliserOptions } from "../../../tools/image/image-normaliser";

export type DebugPutImageData = (
  imageNormaliserOptions: ImageNormaliserOptions,
  imageData: ImageData,
  dx: number,
  dy: number,
) => ReturnType<CanvasImageData["putImageData"]>;
