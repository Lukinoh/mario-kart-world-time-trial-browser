import * as v from "valibot";
import { AttemptsStorageSchema } from "./attempts-storage";
import { ConfigurationStorageSchema } from "./configuration-storage";

export const StorageSchema = v.object({
  personal: AttemptsStorageSchema,
  friends: AttemptsStorageSchema,
  worldRecords: AttemptsStorageSchema,
  configuration: ConfigurationStorageSchema,
});

export type StorageOutput = v.InferOutput<typeof StorageSchema>;
