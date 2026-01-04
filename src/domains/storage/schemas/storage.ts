import * as v from "valibot";
import { AttemptsStorageSchema } from "./attempts-storage";
import { PersonalStorageSchema } from "./personal-storage";

export const StorageSchema = v.object({
  personal: PersonalStorageSchema,
  friends: AttemptsStorageSchema,
  worldRecords: AttemptsStorageSchema,
});

export type StorageOutput = v.InferOutput<typeof StorageSchema>;
