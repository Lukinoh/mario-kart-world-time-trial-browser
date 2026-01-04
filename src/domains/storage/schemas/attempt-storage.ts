import * as v from "valibot";
import { SplitStorageSchema } from "./split-storage";

export const AttemptStorageSchema = v.object({
  player: v.optional(v.string(), "Empty"),
  timestamp: v.number(),
  track: v.string(),
  laps: v.number(),
  splits: v.array(SplitStorageSchema),
});

export type AttemptStorage = v.InferOutput<typeof AttemptStorageSchema>;
