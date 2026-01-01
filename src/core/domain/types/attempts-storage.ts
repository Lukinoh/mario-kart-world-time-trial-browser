import * as v from "valibot";
import { AttemptStorageSchema } from "./attempt-storage";

export const AttemptsStorageSchema = v.object({
  version: v.literal(1),
  attempts: v.array(AttemptStorageSchema),
});

export type AttemptsStorage = v.InferOutput<typeof AttemptsStorageSchema>;
export type AttemptsStorageIssue = v.InferIssue<typeof AttemptsStorageSchema>;
