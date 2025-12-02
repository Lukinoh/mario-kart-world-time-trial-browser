import { EnhancedImageData } from "../tools/image/enhanced-image-data";
import { onMount } from "solid-js";
import { useTimeTrialState } from "./use-time-trial-state";
import { useVideoCanvas } from "./use-video-canvas";

type Mode = "TIME_UPDATE" | "REQUEST_ANIMATION_FRAME";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
export function useTimeTrial(mode: Mode) {
  const { redraw, getImageData, videoElement, canvasElement, putImageData } = useVideoCanvas("DEBUG");
  const { update, attempt, getState } = useTimeTrialState();

  onMount(() => {
    if (mode === "TIME_UPDATE") {
      videoElement.addEventListener("timeupdate", () => {
        processFrame();
      });
    }

    if (mode === "REQUEST_ANIMATION_FRAME") {
      let cancelId = -1;
      const loop = (): void => {
        processFrame();
        cancelId = requestAnimationFrame(loop);
      };
      videoElement.addEventListener("play", () => {
        loop();
      });

      videoElement.addEventListener("pause", () => {
        cancelAnimationFrame(cancelId);
      });
    }
  });

  const start = (): Promise<void> => videoElement.play();

  const processFrame = (): void => {
    const start = performance.now();
    redraw();
    const image = EnhancedImageData.from(getImageData());
    update(image, putImageData);
    console.info(`Time spend to process a frame: ${performance.now() - start}`);
  };

  return { start, videoElement, canvasElement, getState, attempt };
}
