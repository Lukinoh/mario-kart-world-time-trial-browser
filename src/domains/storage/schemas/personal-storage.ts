import * as v from "valibot";
import { AttemptsStorageSchema } from "./attempts-storage";

export const PersonalStorageSchema = v.object({
  ...AttemptsStorageSchema.entries,
  attemptsCountByTrack: v.record(v.string(), v.number()),
});

export type PersonalStorageOutput = v.InferOutput<typeof PersonalStorageSchema>;
