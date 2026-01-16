import * as v from "valibot";
import { ObsEntitySchema } from "./obs-entity";

export const SettingsEntitySchema = v.object({
  version: v.literal(1),
  player: v.string(),
  isVideoVisible: v.boolean(),
  isDebug: v.boolean(),
  playbackRate: v.number(),
  obs: ObsEntitySchema,
});

export type SettingsEntity = v.InferOutput<typeof SettingsEntitySchema>;
