import { Coins } from "../recognitions/coins";
import type { EnhancedImageData } from "../tools/image/enhanced-image-data";
import { Lap } from "../recognitions/lap";
import { Laps } from "../recognitions/laps";
import { Shrooms } from "../recognitions/shrooms";
import { Time } from "../recognitions/time";
import { Track } from "../recognitions/track";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { useAttempt } from "./use-attempt";
import { useIsFinalTime } from "./use-is-final-time";

export enum STATE {
  WAITING_ATTEMPT = "WAITING_ATTEMPT",
  WAITING_SPLIT = "WAITING_SPLIT",
  WAITING_LAST_SPLIT = "WAITING_LAST_SPLIT",
}

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
export function useTimeTrialState() {
  const [getState, setState] = createSignal<STATE>(STATE.WAITING_ATTEMPT);
  const [attempt, setAttempt] = createStore<ReturnType<typeof useAttempt>>(useAttempt("Searching for...", "?"));
  const { isFinalTime } = useIsFinalTime();

  const update = (image: EnhancedImageData, putImageData?: CanvasImageData["putImageData"]): void => {
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

  return { getState, update, attempt };
}
