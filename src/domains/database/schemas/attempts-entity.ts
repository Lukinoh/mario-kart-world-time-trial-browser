import * as v from "valibot";
import { AttemptEntitySchema } from "./attempt-entity";

export const AttemptsEntitySchema = v.object({
  version: v.literal(1),
  attempts: v.array(AttemptEntitySchema),
});

export type AttemptsEntity = v.InferOutput<typeof AttemptsEntitySchema>;
export type AttemptsEntityIssue = v.InferIssue<typeof AttemptsEntitySchema>;
