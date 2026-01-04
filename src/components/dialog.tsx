import { type JSX, Show, createMemo } from "solid-js";
import { Portal } from "solid-js/web";
import { css } from "@emotion/css";
import { defineComponent } from "../domains/_core/utils/solid-js";
import { isFunction } from "remeda";

const sClose = css({
  marginTop: "var(--mk-spacing-large)",
  marginBottom: 0,
});

interface DialogProps extends JSX.CustomAttributes<HTMLDialogElement> {
  showFooter?: boolean;
}

export const Dialog = defineComponent<DialogProps>((props) => {
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
      <dialog ref={setDialog}>
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
});
