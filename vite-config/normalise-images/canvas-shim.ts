import { Canvas, CanvasRenderingContext2D, Image, ImageData } from "canvas";

// @ts-expect-error shiming
globalThis.ImageData = ImageData;
// @ts-expect-error shiming
globalThis.Image = Image;
// @ts-expect-error shiming
globalThis.OffscreenCanvas = Canvas;
// @ts-expect-error shiming
globalThis.Context = CanvasRenderingContext2D;
