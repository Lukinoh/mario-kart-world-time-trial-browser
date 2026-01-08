import * as v from "valibot";
import { TimeSchema } from "./time";

export const SplitEntitySchema = v.object({
  shrooms: v.number(),
  time: TimeSchema,
  coins: v.number(),
});

export type SplitEntity = v.InferOutput<typeof SplitEntitySchema>;
