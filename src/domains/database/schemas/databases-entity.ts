import * as v from "valibot";
import { AttemptsEntitySchema } from "./attempts-entity";
import { PersonalEntitySchema } from "./personal-entity";
import { SettingsEntitySchema } from "./settings-entity";

export const DatabasesEntitySchema = v.object({
  settings: SettingsEntitySchema,
  personal: PersonalEntitySchema,
  friends: AttemptsEntitySchema,
  worldRecords: AttemptsEntitySchema,
});

export type DatabasesEntity = v.InferOutput<typeof DatabasesEntitySchema>;
