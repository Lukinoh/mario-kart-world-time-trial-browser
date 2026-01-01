import * as v from "valibot";
import { TimeSchema } from "./time";

export const SplitStorageSchema = v.object({
  lap: v.number(),
  shrooms: v.number(),
  time: TimeSchema,
  coins: v.number(),
});

export type SplitStorage = v.InferOutput<typeof SplitStorageSchema>;
