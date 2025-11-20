import { Box } from "../box/box";
import type { Pixel } from "../pixel/pixel";
import type { PixelFiltersFunction } from "../pixel/pixel-filters";
import { assert } from "../utils";

export class EnhancedImageData extends ImageData {
  readonly box: Box;

  // Keep the data reference
  static from(imageData: ImageData): EnhancedImageData {
    return new EnhancedImageData(imageData.data, imageData.width, imageData.height, {
      colorSpace: imageData.colorSpace,
    });
  }

  static clone(imageData: ImageData): EnhancedImageData {
    const data = new Uint8ClampedArray(imageData.data);
    return new EnhancedImageData(data, imageData.width, imageData.height, {
      colorSpace: imageData.colorSpace,
    });
  }

  static extract(imageData: ImageData, region: Box): EnhancedImageData {
    const canvas = new OffscreenCanvas(imageData.width, imageData.height);
    const context = canvas.getContext("2d");
    assert(
      context,
      "context identifier is not supported, or the canvas has already been set to a different context mode",
    );
    context.putImageData(imageData, 0, 0);
    return EnhancedImageData.from(context.getImageData(...region.getImageData()));
  }

  private constructor(data: ImageDataArray, sw: number, sh?: number, settings?: ImageDataSettings) {
    super(data, sw, sh, settings);
    this.box = new Box(0, this.width, 0, this.height);
  }

  get pixelCount(): number {
    return this.data.length / 4;
  }

  getPixel(position: number): Pixel {
    const index = position * 4;

    return {
      r: this.data[index],
      g: this.data[index + 1],
      b: this.data[index + 2],
      a: this.data[index + 3],
    };
  }

  setPixel(position: number, newPixel: Pixel): void {
    const index = position * 4;

    this.data[index] = newPixel.r;
    this.data[index + 1] = newPixel.g;
    this.data[index + 2] = newPixel.b;
    this.data[index + 3] = newPixel.a;
  }

  updatePixel(position: number, transform: PixelFiltersFunction): void {
    this.setPixel(position, transform(this.getPixel(position)));
  }

  applyPixelFilter(filter: PixelFiltersFunction): void {
    for (let index = 0; index < this.pixelCount; index = index + 1) {
      this.updatePixel(index, filter);
    }
  }
}
