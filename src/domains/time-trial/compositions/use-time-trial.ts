import { clearTimeout, setTimeout } from "worker-timers";
import { createMemo, createSelector, createSignal, onMount } from "solid-js";
import type { Brand } from "../../_core/utils/brand";
import { EnhancedImageData } from "../../image-manipulation/image/enhanced-image-data";
import { createSingletonRoot } from "../../_core/utils/solid-js";
import { useAttemptManager } from "../../attempt/compositions/use-attempt-manager";
import { usePersonalRepository } from "../../database/compositions/use-personal-repository";
import { useSettingsRepository } from "../../database/compositions/use-settings-repository";
import { useVideoCanvas } from "./use-video-canvas";

type State = "PLAYING" | "PAUSED";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useTimeTrialSingleton() {
  const [state, setState] = createSignal<State>("PAUSED");
  const isState = createSelector(state);
  const vc = useVideoCanvas();
  const manager = useAttemptManager();
  const personal = usePersonalRepository();
  const settings = useSettingsRepository();
  const debugPutImageData = createMemo<CanvasImageData["putImageData"] | undefined>(() => {
    if (settings.isDebug()) {
      return vc.putImageData;
    }
  });

  onMount(() => {
    vc.addEventListener("canplay", () => {
      setState("PAUSED");
    });

    vc.addEventListener("play", () => {
      setState("PLAYING");
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

    vc.addEventListener("emptied", () => {
      clearTimeout(cancelId);
    });
  };

  const processFrame = (): void => {
    const start = performance.now();
    const image = EnhancedImageData.from(vc.getImageData());
    const attempt = manager.update(image, debugPutImageData());

    if (attempt) {
      attempt.player = settings.player() ?? "Noname";
      personal.upsertAttempt(attempt);
    }

    console.info(`Time spend to process a frame: ${performance.now() - start}`);
  };

  return {
    isState,
    play: vc.play,
    pause: vc.pause,
    video: vc.video,
    canvas: vc.canvas,
    fromCamera: vc.setSourceCamera,
    fromUrl: vc.setSourceUrl,
    fromFile: vc.setSourceFile,
  };
}

export type TimeTrial = Brand<ReturnType<typeof useTimeTrialSingleton>>;
export const useTimeTrial = createSingletonRoot<TimeTrial>(useTimeTrialSingleton);
