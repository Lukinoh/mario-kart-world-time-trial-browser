import type { Attempt } from "../core/domain/types/attempt";
import { AttemptHandler } from "../core/domain/attempt-handler";
import type { Brand } from "../core/helpers/brand";
import { Coins } from "../recognitions/coins/coins";
import type { EnhancedImageData } from "../tools/image/enhanced-image-data";
import { Lap } from "../recognitions/lap/lap";
import { Laps } from "../recognitions/laps/laps";
import { Pause } from "../recognitions/pause/pause";
import { Shrooms } from "../recognitions/shrooms/shrooms";
import { Time } from "../recognitions/time/time";
import { Track } from "../recognitions/track/track";
import { useIsFinalTime } from "./utils/use-is-final-time";

export enum STATE {
  WAITING_ATTEMPT = "WAITING_ATTEMPT",
  WAITING_SPLIT = "WAITING_SPLIT",
  WAITING_LAST_SPLIT = "WAITING_LAST_SPLIT",
}

const MINIMUM_TIME_BEFORE_NEXT_RESET_MS = 4500;

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
export function useAttemptManagerFactory() {
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

    // With current, implementation we can several if states during the same cycle.
    // We should verify if it is safe or not.

    // RESET ATTEMPT
    if (
      lap === "1" &&
      coins === "00" &&
      time === "0:00.000" &&
      shrooms === "3" &&
      attempt.isOlderThan(MINIMUM_TIME_BEFORE_NEXT_RESET_MS)
    ) {
      // You may get a double reset attempt if the player presses start during the start timer.
      const track = Track.get(image, putImageData);
      const laps = Laps.get(image, putImageData);

      attempt = new AttemptHandler(track, laps);
      state = STATE.WAITING_SPLIT;

      return attempt.unwrap();
    }

    if (state === STATE.WAITING_SPLIT) {
      const isNotEqualToLastSplit = !attempt.isEqualToLastSplit(time);
      // If we pause and the time is on a yellowish background we may get a false positive.
      // For instance, in Dino Dino Jungle on the long neck dinosaur.
      const isYellow = Time.isYellowish(image);

      if (isNotEqualToLastSplit && isYellow) {
        attempt.addSplit({
          shrooms: shrooms,
          time: time,
          coins: coins,
        });

        if (attempt.isLastLap()) {
          state = STATE.WAITING_LAST_SPLIT;
        }

        return attempt.unwrap();
      }
    }

    if (state === STATE.WAITING_LAST_SPLIT) {
      const isPause = Pause.isPause(image, putImageData);
      const isNotEqualToLastSplit = !attempt.isEqualToLastSplit(time);
      const isFinished = isFinalTime(time, isPause);

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

type AttemptManager = Brand<ReturnType<typeof useAttemptManagerFactory>>;
type AttemptManagerFactory = (...args: Parameters<typeof useAttemptManagerFactory>) => AttemptManager;
export const useAttemptManager: AttemptManagerFactory = useAttemptManagerFactory;
