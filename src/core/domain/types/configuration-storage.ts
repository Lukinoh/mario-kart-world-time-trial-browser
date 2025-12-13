import * as v from "valibot";

export const ConfigurationStorageSchema = v.object({
  version: v.literal(1),
  name: v.string(),
});

export type ConfigurationStorage = v.InferOutput<typeof ConfigurationStorageSchema>;
