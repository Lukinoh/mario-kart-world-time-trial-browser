import * as v from "valibot";
import { SplitSchema } from "./split";
import { TimeSchema } from "./time";

export const AttemptSchema = v.object({
  timestamp: v.number(),
  track: v.string(),
  time: v.optional(TimeSchema),
  coins: v.optional(v.number()),
  laps: v.number(),
  splits: v.array(SplitSchema),
});

export type Attempt = v.InferOutput<typeof AttemptSchema>;
