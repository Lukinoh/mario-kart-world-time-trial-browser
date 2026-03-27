import type { Brand } from "../../_core/utils/brand";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useIsFinalTimeFactory(beforeFinalMs: number) {
  let lastTime: string | undefined = undefined;
  let lastTimestamp = Number.POSITIVE_INFINITY;

  const isFinalTime = (newTime: string, isPause: boolean, rate: number): boolean => {
    const now = Date.now();

    if (isPause) {
      deferFinalTime(now);
      return false;
    }

    // If time has changed, update and return false
    if (lastTime !== newTime) {
      lastTime = newTime;
      lastTimestamp = now;
      return false;
    }

    // If time is the same, check if 1 second has passed
    const elapsed = now - lastTimestamp;
    // The value should not be hardcode, but depends on the speed of the video
    if (elapsed > beforeFinalMs / rate) {
      lastTime = undefined;
      lastTimestamp = Number.POSITIVE_INFINITY;
      return true;
    }

    return false;
  };

  const deferFinalTime = (time?: number): void => {
    lastTimestamp = time ?? Date.now();
  };

  return {
    isFinalTime,
    deferFinalTime,
  };
}

type IsFinalTime = Brand<ReturnType<typeof useIsFinalTimeFactory>>;
type IsFinalTimeFactory = (...args: Parameters<typeof useIsFinalTimeFactory>) => IsFinalTime;
export const useIsFinalTime: IsFinalTimeFactory = useIsFinalTimeFactory;
