import { clearTimeout, setTimeout } from "worker-timers";
import { createSelector, createSignal, onMount } from "solid-js";
import type { Brand } from "../core/helpers/brand";
import { EnhancedImageData } from "../tools/image/enhanced-image-data";
import { useAttemptManager } from "./use-attempt-manager";
import { usePersonalStorage } from "./storage/use-personal-storage";
import { useVideoCanvas } from "./utils/use-video-canvas";

type State = "STARTED" | "PAUSED";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useTimeTrialFactory() {
  const [state, setState] = createSignal<State>("PAUSED");
  const isState = createSelector(state);
  const vc = useVideoCanvas();
  const manager = useAttemptManager();
  const personalStorage = usePersonalStorage();

  onMount(() => {
    vc.addEventListener("canplay", () => {
      setState("PAUSED");
    });

    vc.addEventListener("play", () => {
      setState("STARTED");
    });

    vc.addEventListener("pause", () => {
      setState("PAUSED");
    });

    startProcessFrameLoop();
  });

  const startProcessFrameLoop = (): void => {
    let cancelId = -1;
    const loop = (): void => {
      processFrame();
      cancelId = setTimeout(loop, 200);
    };

    vc.addEventListener("play", () => {
      loop();
    });

    vc.addEventListener("pause", () => {
      clearTimeout(cancelId);
    });
  };

  const processFrame = (): void => {
    const start = performance.now();
    const image = EnhancedImageData.from(vc.getImageData());
    const attempt = manager.update(image, vc.putImageData);

    if (attempt) {
      attempt.player = personalStorage.player();
      personalStorage.upsertAttempt(attempt);
    }

    console.info(`Time spend to process a frame: ${performance.now() - start}`);
  };

  return {
    isState,
    start: vc.start,
    pause: vc.pause,
    video: vc.video,
    canvas: vc.canvas,
    fromCamera: vc.setSourceCamera,
    fromUrl: vc.setSourceUrl,
    fromFile: vc.setSourceFile,
    setPlayer: personalStorage.setPlayer,
    player: personalStorage.player,
  };
}

export type TimeTrial = Brand<ReturnType<typeof useTimeTrialFactory>>;
type TimeTrialFactory = (...args: Parameters<typeof useTimeTrialFactory>) => TimeTrial;
export const useTimeTrial: TimeTrialFactory = useTimeTrialFactory;
