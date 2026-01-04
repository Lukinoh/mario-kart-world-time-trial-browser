import type { AttemptStorage } from "../../storages/schemas/attempt-storage";
import type { Brand } from "../../_core/utils/brand";
import type { RawSplit } from "../types/raw-split";
import type { SplitStorage } from "../../storages/schemas/split-storage";
import { Time } from "../../recognitions/time/time";

const SHROOMS_NUMBER = 3;

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
export function createAttemptHandlerFactory(pTrack: string, pRawLaps: string) {
  const timestamp = Date.now();
  const track = pTrack;
  const laps = Number(pRawLaps);
  const splits: Array<SplitStorage> = [];

  const addSplit = (rawSplit: RawSplit): void => {
    const coins = splits.reduce((acc, split) => acc - split.coins, Number(rawSplit.coins));
    const shrooms = SHROOMS_NUMBER - splits.reduce((acc, split) => acc + split.shrooms, Number(rawSplit.shrooms));

    splits.push({
      ...rawSplit,
      coins: coins,
      shrooms: shrooms,
    });
  };

  const addFinalSplit = (rawSplit: RawSplit): void => {
    // The final raw split has the particularity that the time is not the split time, but the total time.
    const totalTime = Time.parse(rawSplit.time);
    const splitTime = splits.reduce((acc, split): number => acc - Time.parse(split.time), totalTime);

    addSplit({
      ...rawSplit,
      time: Time.format(splitTime),
    });
  };

  const isEqualToLastSplit = (time: string): boolean => {
    return splits.at(-1)?.time === time;
  };

  // We cannot rely on Lap.get(), because when you pass the line, the lap counter does a little bump.
  // and the detection algorithm may return a wrong number. Safer to be based on the number of splits
  const isLastLap = (): boolean => {
    return laps === splits.length + 1;
  };

  const isRawLastLap = (rawLap: string): boolean => {
    return laps === Number(rawLap);
  };

  const isOlderThan = (timeMs: number): boolean => {
    return Date.now() - timestamp > timeMs;
  };

  const unwrap = (): AttemptStorage => {
    return {
      player: "Who knows?",
      timestamp: timestamp,
      track: track,
      laps: laps,
      splits: [...splits], // Avoid keeping the same references
    };
  };

  return {
    addSplit,
    addFinalSplit,
    isEqualToLastSplit,
    isLastLap,
    isRawLastLap,
    isOlderThan,
    unwrap,
  };
}

type AttemptHandler = Brand<ReturnType<typeof createAttemptHandlerFactory>>;
type AttemptHandlerFactory = (...args: Parameters<typeof createAttemptHandlerFactory>) => AttemptHandler;
export const createAttemptHandler: AttemptHandlerFactory = createAttemptHandlerFactory;
