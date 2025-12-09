import * as v from "valibot";
import { TimeSchema } from "./time";

export const SplitSchema = v.object({
  lap: v.number(),
  shrooms: v.number(),
  time: TimeSchema,
  coins: v.number(),
});

export type Split = v.InferOutput<typeof SplitSchema>;
