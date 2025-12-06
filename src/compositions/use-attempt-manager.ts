import type { Attempt } from "../core/types/attempt";
import { AttemptHandler } from "../core/attempt-handler";
import { Coins } from "../recognitions/coins";
import type { EnhancedImageData } from "../tools/image/enhanced-image-data";
import { Lap } from "../recognitions/lap";
import { Laps } from "../recognitions/laps";
import { Shrooms } from "../recognitions/shrooms";
import { Time } from "../recognitions/time";
import { Track } from "../recognitions/track";
import { useIsFinalTime } from "./utils/use-is-final-time";

export enum STATE {
  WAITING_ATTEMPT = "WAITING_ATTEMPT",
  WAITING_SPLIT = "WAITING_SPLIT",
  WAITING_LAST_SPLIT = "WAITING_LAST_SPLIT",
}

const MINIMUM_TIME_BEFORE_NEXT_RESET_MS = 4500;

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
export function useAttemptManager() {
  let state: STATE = STATE.WAITING_ATTEMPT;
  let attempt = new AttemptHandler("Search for...", "?");
  const { isFinalTime } = useIsFinalTime();

  /**
   * Returns an Attempt object only if there was a creation or an update of an Attempt
   */
  const update = (image: EnhancedImageData, putImageData?: CanvasImageData["putImageData"]): Attempt | undefined => {
    const time = Time.get(image, putImageData);
    const lap = Lap.get(image, putImageData);
    const coins = Coins.get(image, putImageData);
    const shrooms = Shrooms.get(image, putImageData);

    // RESET ATTEMPT
    if (
      lap === "1" &&
      coins === "00" &&
      time === "0:00.000" &&
      shrooms === "3" &&
      attempt.isOlderThan(MINIMUM_TIME_BEFORE_NEXT_RESET_MS)
    ) {
      const track = Track.get(image, putImageData);
      const laps = Laps.get(image, putImageData);

      attempt = new AttemptHandler(track, laps);
      state = STATE.WAITING_SPLIT;

      return attempt.unwrap();
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
          state = STATE.WAITING_LAST_SPLIT;
        }

        return attempt.unwrap();
      }
    }

    if (state === STATE.WAITING_LAST_SPLIT) {
      const isNotEqualToLastSplit = !attempt.isEqualToLastSplit(time);
      const isFinished = isFinalTime(time);

      // False positive if the player press start to pause the game
      if (isNotEqualToLastSplit && isFinished) {
        attempt.addFinalSplit({
          shrooms: shrooms,
          time: time,
          coins: coins,
        });
        state = STATE.WAITING_ATTEMPT;
        return attempt.unwrap();
      }
    }
  };

  return { update };
}
