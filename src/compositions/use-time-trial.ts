import { EnhancedImageData } from "../tools/image/enhanced-image-data";
import { useTimeTrialState } from "./use-time-trial-state";
import { useVideoCanvas } from "./use-video-canvas";

export enum PROCESS_FRAME_MODE {
  TIME_UPDATE = "TIME_UPDATE",
  REQUEST_ANIMATION_FRAME = "REQUEST_ANIMATION_FRAME",
}

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
export function useTimeTrial() {
  const { redraw, getImageData, onTimeUpdate, videoElement, canvasElement, putImageData } = useVideoCanvas("DEBUG");
  const { update, attempt, getState } = useTimeTrialState();

  const start = (mode: PROCESS_FRAME_MODE): void => {
    if (mode === PROCESS_FRAME_MODE.TIME_UPDATE) {
      onTimeUpdate((): void => {
        processFrame();
      });
    }

    if (mode === PROCESS_FRAME_MODE.REQUEST_ANIMATION_FRAME) {
      const loop = (): void => {
        processFrame();
        requestAnimationFrame(loop);
      };
      loop();
    }
  };

  const processFrame = (): void => {
    const start = performance.now();
    redraw();
    const image = EnhancedImageData.from(getImageData());
    update(image, putImageData);
    console.info(`Time spend to process a frame: ${performance.now() - start}`);
  };

  return { start, videoElement, canvasElement, getState, attempt };
}
