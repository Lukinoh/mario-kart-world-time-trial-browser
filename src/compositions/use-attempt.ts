import { createStore, reconcile } from "solid-js/store";
import { Time } from "../recognitions/time";

interface Attempt {
  timestamp: number;
  track: string;
  time?: string;
  coins?: number;
  laps: number;
  splits: Array<Split>;
}

interface RawSplit {
  shrooms: string;
  time: string;
  coins: string;
}

interface Split {
  lap: number;
  shrooms: string;
  time: string;
  coins: number;
}

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
export function useAttempt(track: string, rawLaps: string) {
  const [store, setStore] = createStore<Attempt>({
    timestamp: Date.now(),
    track,
    laps: Number(rawLaps),
    splits: [],
  });

  const addSplit = (rawSplit: RawSplit): void => {
    const coins = store.splits.reduce((coins, split) => coins - split.coins, Number(rawSplit.coins));

    setStore(
      "splits",
      store.splits.length,
      // If you do not use reconcile, if you remove "lap" there is no type error
      reconcile({
        ...rawSplit,
        lap: store.splits.length + 1,
        coins: coins,
      }),
    );
  };

  const addFinalSplit = (rawSplit: RawSplit): void => {
    // The final raw split has the particularity that the time is not the split time, but the total time.
    const totalTime = Time.parse(rawSplit.time);
    const splitTime = store.splits.reduce((time, split): number => time - Time.parse(split.time), totalTime);

    setStore("time", rawSplit.time);
    addSplit({
      ...rawSplit,
      time: Time.format(splitTime),
    });
    setStore(
      "coins",
      store.splits.reduce((acc, split) => acc + split.coins, 0),
    );
  };

  const isEqualToLastSplit = (time: string): boolean => store.splits.at(-1)?.time === time;

  const isLastLap = (rawLap: string): boolean => store.laps === Number(rawLap);

  return {
    isEqualToLastSplit,
    addSplit,
    addFinalSplit,
    isLastLap,
    data: store,
  };
}
