import type { JSX } from "solid-js";
import { Portal } from "solid-js/web";
import { css } from "@emotion/css";
import { defineComponent } from "../core/helpers/solid-js";
import { isFunction } from "remeda";

const sClose = css({
  marginTop: "var(--mk-spacing-large)",
  marginBottom: 0,
});

export const Dialog = defineComponent<JSX.CustomAttributes<HTMLDialogElement>>((props) => {
  // oxlint-disable-next-line init-declarations
  let dialog!: HTMLDialogElement;

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
        <footer>
          <button class={sClose} onclick={onClose}>
            Close
          </button>
        </footer>
      </dialog>
    </Portal>
  );
});
