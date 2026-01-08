import * as v from "valibot";
import { SplitEntitySchema } from "./split-entity";

export const AttemptEntitySchema = v.object({
  player: v.optional(v.string(), "Empty"),
  timestamp: v.number(),
  track: v.string(),
  laps: v.number(),
  splits: v.array(SplitEntitySchema),
});

export type AttemptEntity = v.InferOutput<typeof AttemptEntitySchema>;
