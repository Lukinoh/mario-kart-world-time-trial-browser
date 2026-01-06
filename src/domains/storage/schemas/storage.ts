import * as v from "valibot";
import { AttemptsStorageSchema } from "./attempts-storage";
import { PersonalStorageSchema } from "./personal-storage";
import { SettingsStorageSchema } from "./settings-storage";

export const StorageSchema = v.object({
  settings: SettingsStorageSchema,
  personal: PersonalStorageSchema,
  friends: AttemptsStorageSchema,
  worldRecords: AttemptsStorageSchema,
});

export type StorageOutput = v.InferOutput<typeof StorageSchema>;
