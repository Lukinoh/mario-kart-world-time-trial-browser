import * as v from "valibot";
import { isString } from "remeda";

// Later we should be able to replace string by the following time:
// `${number}:${0 | 1 | 2 | 3 | 4 | 5 | 6}${number}.${number}${number}${number}`

export const TimeSchema = v.custom<string>((input) => {
  if (isString(input)) {
    return /^\d:[0-6]\d\.\d\d\d$/.test(input);
  }
  return false;
}, "The format must be m:ss.SSS");

export type Time = v.InferOutput<typeof TimeSchema>;
