import { EnhancedImageData } from "../tools/image/enhanced-image-data";
import { onMount } from "solid-js";
import { useAttemptManager } from "./use-attempt-manager";
import { useStorage } from "./storage/use-storage";
import { useVideoCanvas } from "./utils/use-video-canvas";

type Mode = "TIME_UPDATE" | "REQUEST_ANIMATION_FRAME";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
export function useTimeTrial(mode: Mode, debug = false) {
  const vc = useVideoCanvas(debug);
  const manager = useAttemptManager();
  const storage = useStorage();

  onMount(() => {
    if (mode === "TIME_UPDATE") {
      onModeTimeUpdate();
    }

    if (mode === "REQUEST_ANIMATION_FRAME") {
      onModeRequestAnimationFrame();
    }
  });

  const onModeTimeUpdate = (): void => {
    vc.video.addEventListener("timeupdate", () => {
      processFrame();
    });
  };

  const onModeRequestAnimationFrame = (): void => {
    let cancelId = -1;
    const loop = (): void => {
      processFrame();
      cancelId = requestAnimationFrame(loop);
    };

    vc.video.addEventListener("play", () => {
      loop();
    });

    vc.video.addEventListener("pause", () => {
      cancelAnimationFrame(cancelId);
    });
  };

  const start = (): Promise<void> => {
    return vc.video.play();
  };

  const processFrame = (): void => {
    const start = performance.now();
    const image = EnhancedImageData.from(vc.getImageData());
    const attempt = manager.update(image, vc.putImageData);

    if (attempt) {
      storage.createOrUpdateAttempt(attempt);
    }

    console.info(`Time spend to process a frame: ${performance.now() - start}`);
  };

  return { start, video: vc.video, canvas: vc.canvas, attempt: storage.lastAttempt, attempts: storage.attempts };
}
