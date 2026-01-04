import type { AttemptStorage } from "../../storage/schemas/attempt-storage";
import type { Brand } from "../../_core/utils/brand";
import { Coins } from "../../recognition/coins/coins";
import type { DebugPutImageData } from "../../recognition/debug-put-image-data";
import type { EnhancedImageData } from "../../image-manipulation/image/enhanced-image-data";
import { Lap } from "../../recognition/lap/lap";
import { Laps } from "../../recognition/laps/laps";
import { Pause } from "../../recognition/pause/pause";
import { Shrooms } from "../../recognition/shrooms/shrooms";
import { Time } from "../../recognition/time/time";
import { Track } from "../../recognition/track/track";
import { createAttemptHandler } from "../utils/attempt-handler";
import { useIsFinalTime } from "./use-is-final-time";

enum STATE {
  WAITING_ATTEMPT = "WAITING_ATTEMPT",
  WAITING_SPLIT = "WAITING_SPLIT",
  WAITING_LAST_SPLIT = "WAITING_LAST_SPLIT",
}

const MINIMUM_TIME_BEFORE_NEXT_RESET_MS = 4500;
const ELAPSED_BEFORE_BEING_FINAL_MS = 1000;

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useAttemptManagerFactory() {
  let state: STATE = STATE.WAITING_ATTEMPT;
  let attempt = createAttemptHandler("Search for...", "?");
  const { isFinalTime } = useIsFinalTime(ELAPSED_BEFORE_BEING_FINAL_MS);

  /**
   * Returns an AttemptStorage object only if there was a creation or an update of an AttemptStorage
   */
  const update = (image: EnhancedImageData, putImageData?: DebugPutImageData): AttemptStorage | undefined => {
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

      attempt = createAttemptHandler(track, laps);
      state = STATE.WAITING_SPLIT;

      return attempt.unwrap();
    }

    if (state === STATE.WAITING_SPLIT) {
      const isNotEqualToLastSplit = !attempt.isEqualToLastSplit(time);
      const isTimeYellow = Time.isYellow(image);

      if (isNotEqualToLastSplit && isTimeYellow) {
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

      // If you restart a game during the last lap you could have false detection, hence the conditions on the last lap.
      // The bump should not be problematic in this context (we rely on the fact that pause trigger a 1 as lap)
      if (isNotEqualToLastSplit && isFinished && attempt.isRawLastLap(lap)) {
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
