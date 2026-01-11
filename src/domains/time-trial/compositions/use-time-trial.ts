import { clearTimeout, setTimeout } from "worker-timers";
import { createEffect, createMemo, createSelector, createSignal, onMount } from "solid-js";
import type { Brand } from "../../_core/utils/brand";
import { EnhancedImageData } from "../../image-manipulation/image/enhanced-image-data";
import { createSingletonRoot } from "../../_core/utils/solid-js";
import { targetFromEvent } from "../../_core/utils/event";
import { useAttemptManager } from "../../attempt/compositions/use-attempt-manager";
import { usePersonalRepository } from "../../database/compositions/use-personal-repository";
import { useSettingsRepository } from "../../database/compositions/use-settings-repository";
import { useVideoCanvas } from "./use-video-canvas";

type State = "PLAYING" | "LOADING" | "PAUSED";

const PROCESS_FRAME_INTERVAL_MS = 200;

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useTimeTrialSingleton() {
  const [state, setState] = createSignal<State>("LOADING");
  const isState = createSelector(state);
  const vc = useVideoCanvas();
  const manager = useAttemptManager();
  const personal = usePersonalRepository();
  const settings = useSettingsRepository();
  const getPutImageData = createMemo<CanvasImageData["putImageData"] | undefined>(() => {
    if (settings.isDebug()) {
      return vc.putImageData;
    }
  });
  const getPlaybackRate = createMemo(() => {
    if (vc.supportPlaybackRate()) {
      return settings.playbackRate();
    }

    return 1;
  });

  onMount(() => {
    vc.addEventListener("loadstart", (eve) => {
      const target = targetFromEvent(eve, HTMLVideoElement);
      if (target.networkState !== HTMLMediaElement.NETWORK_NO_SOURCE) {
        setState("PAUSED");
      }
    });

    vc.addEventListener("play", () => {
      setState("PLAYING");
      vc.setPlaybackRate(getPlaybackRate());
    });

    vc.addEventListener("custom_UserMediaError", () => {
      setState("PAUSED");
    });

    vc.addEventListener("pause", () => {
      setState("PAUSED");
    });

    vc.addEventListener("ratechange", (error) => {
      const target = targetFromEvent(error, HTMLVideoElement);
      settings.setPlaybackRate(target.playbackRate);
    });

    createEffect(() => {
      vc.setPlaybackRate(settings.playbackRate());
    });

    startProcessFrameLoop();
  });

  const startProcessFrameLoop = (): void => {
    let cancelId = -1;
    const loop = (): void => {
      processFrame();
      cancelId = setTimeout(loop, PROCESS_FRAME_INTERVAL_MS / getPlaybackRate());
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
    const attempt = manager.update(image, getPlaybackRate(), getPutImageData());

    if (attempt) {
      attempt.player = settings.player() || "Noname";
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
