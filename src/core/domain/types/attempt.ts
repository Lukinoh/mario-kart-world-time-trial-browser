import type { Split } from "./split";

export interface Attempt {
  timestamp: number;
  track: string;
  time?: string;
  coins?: number;
  laps: number;
  splits: Array<Split>;
}
