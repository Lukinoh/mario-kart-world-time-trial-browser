import * as v from "valibot";
import { AttemptSchema } from "./attempt";

export const AttemptsStorageSchema = v.object({
  version: v.literal(1),
  attempts: v.array(AttemptSchema),
});

export type AttemptsStorage = v.InferOutput<typeof AttemptsStorageSchema>;
