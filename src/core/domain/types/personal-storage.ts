import * as v from "valibot";
import { AttemptsStorageSchema } from "./attempts-storage";

export const PersonalStorageSchema = v.object({
  ...AttemptsStorageSchema.entries,
  attemptsNumber: v.number(),
  player: v.string(),
});

export type PersonalStorageOutput = v.InferOutput<typeof PersonalStorageSchema>;
