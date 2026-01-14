import * as v from "valibot";
import { isString } from "remeda";

export const BaseUrlSchema = v.pipe(
  v.string(),
  v.custom<`/${string}/`>(
    (url) => isString(url) && url.startsWith("/") && url.endsWith("/"),
    "The base path must start and end with a /",
  ),
);
