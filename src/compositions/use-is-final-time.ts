// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
export function useIsFinalTime() {
  let lastDate: number = Number.POSITIVE_INFINITY;
  let lastTime: string | undefined = undefined;

  const isFinalTime = (newTime: string): boolean => {
    const now = Date.now();

    // If time has changed, update and return false
    if (lastTime !== newTime) {
      lastTime = newTime;
      lastDate = now;
      return false;
    }

    // If time is the same, check if 1 second has passed
    const timeElapsed = now - lastDate;
    // The value should not be hardcode, but depends on the speed of the video
    if (timeElapsed > 1000) {
      lastTime = undefined;
      lastDate = Number.POSITIVE_INFINITY;
      return true;
    }

    return false;
  };

  return { isFinalTime };
}
