import * as v from "valibot";

export const SettingsStorageSchema = v.object({
  version: v.literal(1),
  player: v.string(),
  isVideoVisible: v.boolean(),
  isDebug: v.boolean(),
});

export type SettingsStorage = v.InferOutput<typeof SettingsStorageSchema>;
