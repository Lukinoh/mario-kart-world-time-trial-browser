import { clearTimeout, setTimeout } from "worker-timers";
import { createSelector, createSignal, onMount } from "solid-js";
import type { Brand } from "../../_core/utils/brand";
import type { DebugPutImageData } from "../../recognition/debug-put-image-data";
import { EnhancedImageData } from "../../image-manipulation/image/enhanced-image-data";
import { Environment } from "../../_core/environment";
import { ImageFilters } from "../../image-manipulation/image/image-filters";
import type { ImageNormaliserOptions } from "../../image-manipulation/image/image-normaliser";
import { createSingletonRoot } from "../../_core/utils/solid-js";
import { useAttemptManager } from "../../attempt/compositions/use-attempt-manager";
import { usePersonalStorage } from "../../storage/compositions/use-personal-storage";
import { useVideoCanvas } from "./use-video-canvas";

type State = "STARTED" | "PAUSED";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useTimeTrialSingleton() {
  const [state, setState] = createSignal<State>("PAUSED");
  const isState = createSelector(state);
  const vc = useVideoCanvas();
  const manager = useAttemptManager();
  const personalStorage = usePersonalStorage();
  let debugPutImageData: undefined | DebugPutImageData = undefined;

  onMount(() => {
    if (Environment.isDebug) {
      debugPutImageData = (
        imageNormaliserOptions: ImageNormaliserOptions,
        imageData: ImageData,
        dx: number,
        dy: number,
      ): void => {
        let image = EnhancedImageData.from(imageData);
        if (imageNormaliserOptions.filter === ImageFilters.identity) {
          image = EnhancedImageData.clone(imageData);
          ImageFilters.invert(image);
        }

        vc.putImageData(image, dx, dy);
      };
    }

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
    const attempt = manager.update(image, debugPutImageData);

    if (attempt) {
      attempt.player = personalStorage.player() || "Noname";
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

export type TimeTrial = Brand<ReturnType<typeof useTimeTrialSingleton>>;
export const useTimeTrial = createSingletonRoot<TimeTrial>(useTimeTrialSingleton);
