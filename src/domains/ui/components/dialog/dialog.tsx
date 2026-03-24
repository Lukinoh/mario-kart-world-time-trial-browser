import { type Component, type JSX, type Ref, Show, onMount } from "solid-js";
import type { Classable } from "../../../_core/types/classable";
import { DialogContent } from "./dialog-content";
import { DialogContext } from "./dialog-context";
import { Portal } from "solid-js/web";
import { css } from "@emotion/css";
import { isFunction } from "remeda";

const sDialog = css({
  "> :first-child": {
    marginTop: 0,
  },
  "> :last-child": {
    marginBottom: 0,
  },
});

export interface DialogRef {
  ref: HTMLDialogElement;
  open: () => void;
  close: () => void;
}

interface DialogProps extends Classable {
  children: JSX.Element;
  title?: string;
  ref?: Ref<DialogRef>;
  onClose?: () => void;
}

export const Dialog: Component<DialogProps> = (props) => {
  let dialog!: HTMLDialogElement; // oxlint-disable-line init-declarations no-unassigned-vars

  onMount(() => {
    dialog?.addEventListener("close", () => {
      props.onClose?.();
    });
  });

  const setDialog = (ref: HTMLDialogElement): void => {
    dialog = ref;
    if (isFunction(props.ref)) {
      props.ref({
        ref: dialog,
        open: () => {
          dialog.showModal();
        },
        close: () => {
          dialog.close();
        },
      });
    }
  };

  return (
    <Portal>
      <dialog ref={setDialog} class={css(sDialog, props.class)}>
        <DialogContext.Provider value={dialog}>
          <Show when={props.title}>
            <h3>{props.title}</h3>
          </Show>
          <DialogContent>{props.children}</DialogContent>
        </DialogContext.Provider>
      </dialog>
    </Portal>
  );
};
