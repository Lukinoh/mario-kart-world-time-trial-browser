import { entries, find, map, pipe, reverse } from "remeda";
import defaultVideo from "../../../assets/demo/demo.webm";
import { getFilename } from "../../image-manipulation/utils";

const dynamicVideos = pipe(
  import.meta.glob<string>(["../../../assets/demo/*_*"], {
    import: `default`,
    eager: true,
  }),
  entries(),
  reverse(),
  map(([resolvedPath, assetPath]) => [getFilename(resolvedPath), assetPath] as const),
);

export const getDebugVideoUrl = (player: string): string => {
  return pipe(
    dynamicVideos,
    find(([filename]) => `DEBUG_${filename}`.slice(0, 8) === player),
    (result) => result?.[1] ?? defaultVideo,
  );
};
