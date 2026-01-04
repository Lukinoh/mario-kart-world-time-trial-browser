import { type Image, loadImage } from "../../src/domains/image-manipulation/image/image-loader";
import sharp, { type OutputInfo } from "sharp";
import type { ImageRecognitionOptions } from "../../src/domains/image-manipulation/image/image-recognition";
import { createCanvas } from "canvas";
import { normaliseImage } from "../../src/domains/image-manipulation/image/image-normaliser";
import { writeFileSync } from "node:fs";

export interface NormaliseOptions {
  options: ImageRecognitionOptions;
  with: "canvas" | "sharp";
}

export async function normalise(sourcePath: string, targetPath: string, options: NormaliseOptions): Promise<Image> {
  const image = await loadImage([sourcePath, sourcePath]);
  const normalisedImage = normaliseImage(image, options.options);
  if (options.with === "canvas") {
    saveWithCanvas(normalisedImage, targetPath);
  } else if (options.with === "sharp") {
    await saveWithSharp(normalisedImage, targetPath);
  }

  return image;
}

function saveWithSharp(image: Image, targetPath: string): Promise<OutputInfo> {
  return sharp(image.value.data, { raw: { width: image.value.width, height: image.value.height, channels: 4 } })
    .png()
    .toFile(targetPath);
}

function saveWithCanvas(image: Image, targetPath: string): void {
  const canvas = createCanvas(image.value.width, image.value.height);
  const ctx = canvas.getContext("2d");
  ctx.putImageData(image.value, 0, 0);
  const buffer = canvas.toBuffer("image/png");
  writeFileSync(targetPath, buffer);
}
