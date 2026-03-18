import { type Component, type JSX, Show, children, createMemo } from "solid-js";
import { css } from "@emotion/css";

const sFooter = css({
  marginTop: "var(--mk-spacing-large)",
});

interface DialogContentProps {
  children: JSX.Element;
}

export const DialogContent: Component<DialogContentProps> = (props) => {
  const resolvedChildren = children(() => props.children);
  const htmlChildren = createMemo(() => resolvedChildren.toArray().filter((child) => child instanceof HTMLElement));

  const body = createMemo(() => htmlChildren().filter((element) => element.slot === ""));
  const footerSlot = createMemo(() => htmlChildren().filter((element) => element.slot === "footer"));

  return (
    <>
      {body()}

      <Show when={footerSlot().length}>
        <footer class={sFooter}>{footerSlot()}</footer>
      </Show>
    </>
  );
};
