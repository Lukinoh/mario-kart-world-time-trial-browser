import { createSignal, onMount } from "solid-js";
import { Coins } from "./recognitions/coins";
import { EnhancedImageData } from "./tools/image/enhanced-image-data";
import { Lap } from "./recognitions/lap";
import { Laps } from "./recognitions/laps";
import { Shrooms } from "./recognitions/shrooms";
import { Time } from "./recognitions/time";
import { Track } from "./recognitions/track";
import { createStore } from "solid-js/store";
import { css } from "@emotion/css";
import { defineComponent } from "./tools/utils";
import { useAttempt } from "./compositions/use-attempt";
import { useIsFinalTime } from "./compositions/use-is-final-time";
import { useVideoCanvas } from "./tools/video/video-canvas";

export enum STATE {
  WAITING_ATTEMPT = "WAITING_ATTEMPT",
  WAITING_SPLIT = "WAITING_SPLIT",
  WAITING_LAST_SPLIT = "WAITING_LAST_SPLIT",
}

const sDebug = css({
  display: "grid",
  gridTemplateColumns: "50% 50%",
  gap: "1rem",
});

export const App = defineComponent(() => {
  const [getState, setState] = createSignal<STATE>(STATE.WAITING_ATTEMPT);
  const { redraw, getImageData, onTimeUpdate, videoElement, putImageData, canvasElement } = useVideoCanvas("DEBUG");
  const [attempt, setAttempt] = createStore<ReturnType<typeof useAttempt>>(useAttempt("null", "null"));
  const { isFinalTime } = useIsFinalTime();

  onMount(() => {
    onTimeUpdate(() => {
      const start = performance.now();
      processFrame();
      const end = performance.now() - start;
      console.info(`Time spend to process a frame: ${end}`);
    });

    // const reframe= (() => {
    //   const start = performance.now();
    //   processFrame();
    //   const end = performance.now() - start;
    //   console.info(`Time spend to process a frame: ${end}`);
    //   requestAnimationFrame(reframe)
    // });
    // reframe()
  });

  const processFrame = (): void => {
    redraw();
    const image = EnhancedImageData.from(getImageData());

    const time = Time.get(image, putImageData);
    const lap = Lap.get(image, putImageData);
    const coins = Coins.get(image, putImageData);
    const shrooms = Shrooms.get(image, putImageData);

    const state = getState();

    // RESET ATTEMPT
    if (lap === "1" && coins === "00" && time === "0:00.000" && shrooms === "3") {
      const track = Track.get(image, putImageData);
      const laps = Laps.get(image, putImageData);
      setAttempt(useAttempt(track, laps));
      setState(STATE.WAITING_SPLIT);
      // Add last attempt to history
    }

    if (state === STATE.WAITING_SPLIT) {
      const isNotEqualToLastSplit = !attempt.isEqualToLastSplit(time);
      const isYellow = Time.isYellowish(image);

      if (isNotEqualToLastSplit && isYellow) {
        attempt.addSplit({
          shrooms: shrooms,
          time: time,
          coins: coins,
        });

        if (attempt.isLastLap(lap)) {
          setState(STATE.WAITING_LAST_SPLIT);
        }
      }
    }

    if (state === STATE.WAITING_LAST_SPLIT) {
      const isNotEqualToLastSplit = !attempt.isEqualToLastSplit(time);
      const isFinished = isFinalTime(time);

      if (isNotEqualToLastSplit && isFinished) {
        attempt.addFinalSplit({
          shrooms: shrooms,
          time: time,
          coins: coins,
        });
        setState(STATE.WAITING_ATTEMPT);
      }
    }
  };

  return (
    <>
      <h1>Debug</h1>
      <div class={sDebug}>
        <div>
          <h2>Video</h2>
          {videoElement}
          {canvasElement}
        </div>
        <div>
          <h2>State</h2>
          <pre>
            <code>{getState()}</code>
          </pre>
          <h2>Raw data</h2>
          <pre>
            <code>{JSON.stringify(attempt.data, undefined, 2)}</code>
          </pre>
        </div>
      </div>
    </>
  );
});
