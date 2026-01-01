import * as v from "valibot";
import { SplitStorageSchema } from "./split-storage";
import { TimeSchema } from "./time";

export const AttemptStorageSchema = v.object({
  player: v.optional(v.string(), "Empty"),
  timestamp: v.number(),
  track: v.string(),
  time: v.optional(TimeSchema),
  coins: v.optional(v.number()),
  laps: v.number(),
  splits: v.array(SplitStorageSchema),
});

export type AttemptStorage = v.InferOutput<typeof AttemptStorageSchema>;
