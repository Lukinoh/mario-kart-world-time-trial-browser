import type { Box } from "../box/box";
import type { Pixel } from "../pixel/pixel";
import type { PixelFiltersFunction } from "../pixel/pixel-filters";

export class EnhancedImageData extends ImageData {
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

  /**
   * Extract a sub-region of an image
   *
   * Previous implementation was using OffscreenCanvas (2d) with getImageData.
   * However, the function was way slower.
   *
   * @param imageData An image data
   * @param region A box that defines the zone to extract from the imageData
   */
  static extract(imageData: ImageData, region: Box): EnhancedImageData {
    const data = new Uint8ClampedArray(region.width * region.height * 4);
    const pixelStart = imageData.width * region.y + region.x;

    const lineCount = region.height;
    for (let line = 0; line < lineCount; line = line + 1) {
      const pixelOffset = line * imageData.width;
      const positionStart = (pixelStart + pixelOffset) * 4;
      const positionEnd = positionStart + region.width * 4;
      const positionOffset = line * region.width * 4;
      data.set(imageData.data.subarray(positionStart, positionEnd), positionOffset);
    }

    return EnhancedImageData.from(new ImageData(data, region.width, region.height));
  }

  private constructor(data: ImageDataArray, sw: number, sh?: number, settings?: ImageDataSettings) {
    super(data, sw, sh, settings);
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
    const { pixelCount } = this;
    for (let index = 0; index < pixelCount; index = index + 1) {
      this.updatePixel(index, filter);
    }
  }
}
