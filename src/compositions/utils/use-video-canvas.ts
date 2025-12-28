import type { Brand } from "../../core/helpers/brand";
import type { JSX } from "solid-js";
import { assert } from "../../core/helpers/assert";

const VIDEO_WIDTH = 1280;
const VIDEO_HEIGHT = 720;

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useVideoCanvasFactory() {
  const videoElement = document.createElement("video");
  const canvasElement = document.createElement("canvas");
  const context = canvasElement.getContext("2d", { willReadFrequently: true, alpha: false });
  assert(context, "Context is null");

  videoElement.width = VIDEO_WIDTH;
  videoElement.height = VIDEO_HEIGHT;
  videoElement.style.width = "100%";
  canvasElement.width = VIDEO_WIDTH;
  canvasElement.height = VIDEO_HEIGHT;
  canvasElement.style.width = "100%";

  const resetSource = (): void => {
    URL.revokeObjectURL(videoElement.src);
    // srcObject necessitate a null value
    // oxlint-disable-next-line no-null
    videoElement.srcObject = null;
    videoElement.src = "";
    videoElement.currentTime = 0;
    videoElement.controls = false;
  };

  const setSourceUrl = (url: string): void => {
    resetSource();
    videoElement.src = url;
    videoElement.currentTime = 0.1; // Display thumbnail on canvas
    videoElement.controls = true;
  };

  const setSourceCamera = async (): Promise<void> => {
    resetSource();
    videoElement.srcObject = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { exact: VIDEO_WIDTH },
        height: { exact: VIDEO_HEIGHT },
        frameRate: { ideal: 60 },
      },
    });
  };

  const setSourceFile = (file: File): void => {
    const url = URL.createObjectURL(file);
    setSourceUrl(url);
  };

  const start = (): Promise<void> => {
    return videoElement.play();
  };

  const pause = (): void => {
    videoElement.pause();
  };

  const getImageData = (): ImageData => {
    context.drawImage(videoElement, 0, 0);
    return context.getImageData(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
  };

  const putImageData = (imageData: ImageData, dx: number, dy: number): void => {
    context.putImageData(imageData, dx, dy);
  };

  return {
    start,
    pause,
    addEventListener: videoElement.addEventListener.bind(videoElement),
    getImageData,
    putImageData,
    setSourceUrl,
    setSourceCamera,
    setSourceFile,
    canvas: canvasElement as JSX.Element,
    video: videoElement as JSX.Element,
  };
}

type VideoCanvas = Brand<ReturnType<typeof useVideoCanvasFactory>>;
type VideoCanvasFactory = (...args: Parameters<typeof useVideoCanvasFactory>) => VideoCanvas;
export const useVideoCanvas: VideoCanvasFactory = useVideoCanvasFactory;
