import type { Attempt } from "./types/attempt";
import { DestructurableClass } from "./destructurable-class";
import type { RawSplit } from "./types/raw-split";
import type { Split } from "./types/split";
import { Time } from "../recognitions/time";

export class AttemptHandler extends DestructurableClass {
  private timestamp: number;
  private track: string;
  private laps: number;
  private splits: Array<Split>;
  private time: string | undefined;
  private coins: number | undefined;

  constructor(track: string, rawLaps: string) {
    super();
    this.timestamp = Date.now();
    this.track = track;
    this.laps = Number(rawLaps);
    this.splits = [];
  }

  addSplit(rawSplit: RawSplit): void {
    const coins = this.splits.reduce((coins, split) => coins - split.coins, Number(rawSplit.coins));
    const shrooms = 3 - this.splits.reduce((shrooms, split) => shrooms + split.shrooms, Number(rawSplit.shrooms));

    this.splits.push({
      ...rawSplit,
      lap: this.splits.length + 1,
      coins: coins,
      shrooms: shrooms,
    });
  }

  addFinalSplit(rawSplit: RawSplit): void {
    // The final raw split has the particularity that the time is not the split time, but the total time.
    const totalTime = Time.parse(rawSplit.time);
    const splitTime = this.splits.reduce((time, split): number => time - Time.parse(split.time), totalTime);

    this.time = rawSplit.time;
    this.addSplit({
      ...rawSplit,
      time: Time.format(splitTime),
    });
    this.coins = this.splits.reduce((acc, split) => acc + split.coins, 0);
  }

  isEqualToLastSplit(time: string): boolean {
    return this.splits.at(-1)?.time === time;
  }

  isLastLap(rawLap: string): boolean {
    return this.laps === Number(rawLap);
  }

  isOlderThan(timeMs: number): boolean {
    return Date.now() - this.timestamp > timeMs;
  }

  unwrap(): Attempt {
    return {
      timestamp: this.timestamp,
      track: this.track,
      laps: this.laps,
      splits: [...this.splits], // Avoid keeping the same references
      coins: this.coins,
      time: this.time,
    };
  }
}
