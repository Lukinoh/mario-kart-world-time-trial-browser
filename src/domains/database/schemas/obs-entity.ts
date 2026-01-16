import * as v from "valibot";

export const ObsEntitySchema = v.object({
  popup: v.object({
    width: v.number(),
    height: v.number(),
  }),
});

export type ObsEntity = v.InferOutput<typeof ObsEntitySchema>;
