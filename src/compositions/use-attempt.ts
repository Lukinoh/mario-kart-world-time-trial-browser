import { createStore, reconcile } from "solid-js/store";
import { Time } from "../recognitions/time";

interface Attempt {
  timestamp: number;
  track: string;
  time?: string;
  laps: string;
  splits: Array<Split>;
}

interface Split {
  lap: string;
  shrooms: string;
  time: string;
  coins: string;
}

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
export function useAttempt(track: string, laps: string) {
  const [store, setStore] = createStore<Attempt>({
    timestamp: Date.now(),
    track,
    laps,
    splits: [],
  });

  const addSplit = (split: Omit<Split, "lap">): void => {
    setStore(
      "splits",
      store.splits.length,
      reconcile({
        ...split,
        lap: `${store.splits.length + 1}`,
      }),
    );
  };

  const addFinalSplit = (split: Omit<Split, "lap">): void => {
    // The final split has the particularity that the time is the final time and not the split time.
    const totalTime = Time.parse(split.time);
    const splitTime = store.splits.reduce(
      (time, split): number => time - Time.parse(split.time).getTime(),
      totalTime.getTime(),
    );

    setStore("time", split.time);
    addSplit({
      ...split,
      time: Time.format(splitTime),
    });
  };

  const isEqualToLastSplit = (time: string): boolean => store.splits.at(-1)?.time === time;

  const isLastLap = (lap: string): boolean => store.laps === lap;

  return {
    isEqualToLastSplit,
    addSplit,
    addFinalSplit,
    isLastLap,
    data: store,
  };
}
