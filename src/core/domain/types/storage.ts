import * as v from "valibot";
import { AttemptsStorageSchema } from "./attempts-storage";

export const StorageSchema = v.object({
  personal: AttemptsStorageSchema,
  friends: AttemptsStorageSchema,
  worldRecords: AttemptsStorageSchema,
});

export type StorageOutput = v.InferOutput<typeof StorageSchema>;
