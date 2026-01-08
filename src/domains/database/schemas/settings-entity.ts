import * as v from "valibot";

export const SettingsEntitySchema = v.object({
  version: v.literal(1),
  player: v.string(),
  isVideoVisible: v.boolean(),
  isDebug: v.boolean(),
});

export type SettingsEntity = v.InferOutput<typeof SettingsEntitySchema>;
