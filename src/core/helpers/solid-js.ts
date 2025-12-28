import type { Component, JSX } from "solid-js";

export function defineComponent<P extends { [key in keyof P]: unknown }>(component: Component<P>): Component<P> {
  return component;
}

export interface ViewProps {
  setTitle: (title: string) => void;
}

/**
 * Used to create a component that does not have props for the Route
 * @param component Component with props
 * @param props Props of the component
 * @param onBeforeEnter Function executed before the page is accessed
 */
export function ci<P extends ViewProps>(
  component: Component<P>,
  props: P,
  onBeforeEnter?: () => void,
): () => JSX.Element {
  return () => {
    onBeforeEnter?.();
    return component({ ...props });
  };
}
