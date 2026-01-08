import * as v from "valibot";
import { AttemptsEntitySchema } from "./attempts-entity";

export const PersonalEntitySchema = v.object({
  ...AttemptsEntitySchema.entries,
  attemptsCountByTrack: v.record(v.string(), v.number()),
});

export type PersonalEntity = v.InferOutput<typeof PersonalEntitySchema>;
