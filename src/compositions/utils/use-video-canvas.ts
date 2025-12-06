import { assert } from "../../tools/utils";
import demoVideoSrc from "../../assets/demo/demo.webm";
import { onMount } from "solid-js";

const VIDEO_WIDTH = 1280;
const VIDEO_HEIGHT = 720;

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
export function useVideoCanvas(debug = false) {
  const videoElement = document.createElement("video");
  const canvasElement = document.createElement("canvas");
  const context = canvasElement.getContext("2d", { willReadFrequently: true, alpha: false });
  assert(context, "Context is null");

  videoElement.width = VIDEO_WIDTH;
  videoElement.height = VIDEO_HEIGHT;
  videoElement.controls = true;
  canvasElement.width = VIDEO_WIDTH;
  canvasElement.height = VIDEO_HEIGHT;
  canvasElement.style.width = "100%";

  // oxlint-disable-next-line no-misused-promises
  onMount(async () => {
    if (debug) {
      videoElement.src = demoVideoSrc;
      videoElement.currentTime = 0.1; // Display thumbnail on canvas
    } else {
      videoElement.srcObject = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { exact: VIDEO_WIDTH },
          height: { exact: VIDEO_HEIGHT },
          frameRate: { ideal: 60 },
        },
      });
    }
  });

  const getImageData = (): ImageData => {
    context.drawImage(videoElement, 0, 0);
    return context.getImageData(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
  };

  const putImageData = (imageData: ImageData, dx: number, dy: number): void => {
    context.putImageData(imageData, dx, dy);
  };

  return {
    getImageData,
    putImageData,
    canvas: canvasElement,
    video: videoElement,
  };
}
