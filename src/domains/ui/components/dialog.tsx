import { type Component, type JSX, type Ref, Show, createMemo } from "solid-js";
import { Portal } from "solid-js/web";
import { css } from "@emotion/css";
import { isFunction } from "remeda";

const sClose = css({
  marginTop: "var(--mk-spacing-large)",
});

const sLastChild = css({
  "> :first-child": {
    marginTop: 0,
  },
  "> :last-child": {
    marginBottom: 0,
  },
});

interface DialogProps {
  title?: string;
  showFooter?: boolean;
  ref?: Ref<HTMLDialogElement>;
  children: JSX.Element;
}

export const Dialog: Component<DialogProps> = (props) => {
  // oxlint-disable-next-line init-declarations
  let dialog!: HTMLDialogElement;
  const showFooter = createMemo(() => props.showFooter ?? true);

  const setDialog = (element: HTMLDialogElement): void => {
    dialog = element;
    if (isFunction(props.ref)) {
      props.ref(element);
    }
  };

  const onClose = (): void => {
    dialog.close();
  };

  return (
    <Portal>
      <dialog ref={setDialog} class={sLastChild}>
        <Show when={props.title}>
          <h3>{props.title}</h3>
        </Show>
        {props.children}
        <Show when={showFooter()}>
          <footer>
            <button class={sClose} onClick={onClose}>
              Close
            </button>
          </footer>
        </Show>
      </dialog>
    </Portal>
  );
};
