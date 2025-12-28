import type { Component, JSX } from "solid-js";
import type { ViewProps } from "../core/view-props";
import { isEmptyish } from "remeda";

export function assert(condition: unknown, msg?: string): asserts condition {
  // oxlint-disable-next-line strict-boolean-expressions
  if (!condition) {
    throw new Error(msg);
  }
}

export function getFilename(path: string): string {
  const filename = path.split("/").pop()?.split(".").slice(0, -1).join(".");
  assert(!isEmptyish(filename), `An error happened while trying to extract the filename from ${path}`);
  return filename;
}

export function defineComponent<P extends { [key in keyof P]: unknown }>(component: Component<P>): Component<P> {
  return component;
}

export function ci<P extends ViewProps>(
  component: Component<P>,
  props: P,
  onInstantiation?: () => void,
): () => JSX.Element {
  return () => {
    onInstantiation?.();
    return component({ ...props });
  };
}

// // ImageData to Document to see result
// export function imageDataToDom(image: ImageHandler): void {
//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext("2d");
//     assert(context, "context identifier is not supported, or the canvas has already been set to a different context mode")
//
//     canvas.width = image.width
//     canvas.width = image.height;
//     context.putImageData(image.getImageData(), 0, 0);
//
//     const img = document.createElement("img");
//     img.src = canvas.toDataURL();
//     document.body.appendChild(img)
// }
