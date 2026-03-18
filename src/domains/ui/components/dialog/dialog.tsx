import { type Component, type JSX, type Ref, Show, onMount } from "solid-js";
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
  open: () => void;
  close: () => void;
}

interface DialogProps {
  children: JSX.Element;
  title?: string;
  ref?: Ref<DialogRef>;
}

export const Dialog: Component<DialogProps> = (props) => {
  // oxlint-disable-next-line init-declarations no-unassigned-vars
  let dialog!: HTMLDialogElement;

  onMount(() => {
    if (isFunction(props.ref)) {
      props.ref({
        open: () => {
          dialog.showModal();
        },
        close: () => {
          dialog.close();
        },
      });
    }
  });

  return (
    <Portal>
      <dialog ref={dialog} class={sDialog}>
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
