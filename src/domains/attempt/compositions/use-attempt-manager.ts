import * as v from "valibot";
import type { AttemptEntity } from "../../database/schemas/attempt-entity";
import type { Brand } from "../../_core/utils/brand";
import { Coins } from "../../recognition/coins/coins";
import type { EnhancedImageData } from "../../image-manipulation/image/enhanced-image-data";
import { Lap } from "../../recognition/lap/lap";
import { Laps } from "../../recognition/laps/laps";
import { Pause } from "../../recognition/pause/pause";
import { Shrooms } from "../../recognition/shrooms/shrooms";
import { Time } from "../../recognition/time/time";
import { TimeSchema } from "../../database/schemas/time";
import { Track } from "../../recognition/track/track";
import { createAttemptHandler } from "../utils/attempt-handler";
import { isDefined } from "remeda";
import { useIsFinalTime } from "./use-is-final-time";

type State = "WAITING_ATTEMPT" | "WAITING_SPLIT" | "WAITING_LAST_SPLIT";

const MINIMUM_TIME_BEFORE_NEXT_RESET_MS = 4500;
const ELAPSED_BEFORE_BEING_FINAL_MS = 1000;

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useAttemptManagerFactory() {
  let state: State = "WAITING_ATTEMPT";
  let attempt = createAttemptHandler("Search for...", "?");
  const { deferFinalTime, isFinalTime } = useIsFinalTime(ELAPSED_BEFORE_BEING_FINAL_MS);

  /**
   * Returns an AttemptEntity object only if there was a creation or an update of an AttemptEntity
   */
  const update = (
    image: EnhancedImageData,
    rate: number,
    putImageData?: CanvasImageData["putImageData"],
  ): AttemptEntity | undefined => {
    const time = Time.get(image, putImageData);
    const coins = Coins.get(image, putImageData);

    if (!isDefined(time) || !isDefined(coins)) {
      deferFinalTime();
      return undefined;
    }

    const lap = Lap.get(image, putImageData);
    const shrooms = Shrooms.get(image, putImageData);

    // RESET ATTEMPT
    if (
      lap === "1" &&
      coins === "00" &&
      time === "0:00.000" &&
      shrooms === "3" &&
      attempt.isOlderThan(MINIMUM_TIME_BEFORE_NEXT_RESET_MS / rate)
    ) {
      // You may get a double reset attempt if the player presses pause during the start countdown.
      const track = Track.get(image, putImageData);
      const laps = Laps.get(image, putImageData);

      attempt = createAttemptHandler(track, laps);
      state = "WAITING_SPLIT";

      return attempt.unwrap();
    }

    if (state === "WAITING_SPLIT") {
      const isNotEqualToLastSplit = !attempt.isEqualToLastSplit(time);
      const isTimeYellow = Time.isYellow(image);

      if (isNotEqualToLastSplit && isTimeYellow) {
        attempt.addSplit({
          shrooms: shrooms,
          time: time,
          coins: coins,
        });

        if (attempt.isLastLap()) {
          state = "WAITING_LAST_SPLIT";
        }

        return attempt.unwrap();
      }
    }

    if (state === "WAITING_LAST_SPLIT") {
      const isPause = Pause.isPause(image, putImageData);
      const isNotEqualToLastSplit = !attempt.isEqualToLastSplit(time);
      const isFinished = isFinalTime(time, isPause, rate);
      const finalSplit = attempt.getFinalSplit(time);

      // If you restart a game during the last lap, you could have false detection, hence the conditions on the last lap.
      // The bump should not be problematic in this context (we rely on the fact that pause triggers a 1 recognized as the current lap).
      // Moreover, it is possible that finalSplit to be negative (=not valid TimeSchema) if you keep pressed on the home button to display the side menu.
      if (
        isNotEqualToLastSplit &&
        isFinished &&
        attempt.isRawLastLap(lap) &&
        v.safeParse(TimeSchema, finalSplit).success
      ) {
        attempt.addSplit({
          shrooms: shrooms,
          time: finalSplit,
          coins: coins,
        });
        state = "WAITING_ATTEMPT";
        return attempt.unwrap();
      }
    }
  };

  return { update };
}

type AttemptManager = Brand<ReturnType<typeof useAttemptManagerFactory>>;
type AttemptManagerFactory = (...args: Parameters<typeof useAttemptManagerFactory>) => AttemptManager;
export const useAttemptManager: AttemptManagerFactory = useAttemptManagerFactory;
