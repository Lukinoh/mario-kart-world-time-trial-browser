import { type Component, type Ref, Show, createSignal } from "solid-js";
import { Dialog, type DialogRef } from "../../ui/components/dialog/dialog";
import type { Attempt } from "../schemas/attempt";
import { AttemptsTable } from "./attempts-table";
import { DialogFooterConfirm } from "../../ui/components/dialog/footers/dialog-footer-confirm";
import { css } from "@emotion/css";
import { isFunction } from "remeda";

const sContent = css({
  display: "flex",
  flexDirection: "column",
  gap: "var(--mk-spacing-large)",
  overflow: "auto",
});

export interface AttemptDeleteDialogRef {
  open: (attempt: Attempt) => void;
}

interface AttemptDeleteDialogProps {
  ref?: Ref<AttemptDeleteDialogRef>;
  onDelete: (attempt: Attempt) => void;
}

export const AttemptDeleteDialog: Component<AttemptDeleteDialogProps> = (props) => {
  let dialog!: DialogRef; // oxlint-disable-line init-declarations no-unassigned-vars

  const [attempt, setAttempt] = createSignal<Attempt | undefined>();

  const setDialog = (ref: DialogRef): void => {
    dialog = ref;
    if (isFunction(props.ref)) {
      props.ref({
        open: (attempt: Attempt) => {
          setAttempt(attempt);
          dialog.open();
        },
      });
    }
  };

  const onClose = (): void => {
    setAttempt(undefined);
  };

  const onConfirm = (attempt: Attempt): void => {
    props.onDelete(attempt);
  };

  return (
    <Dialog ref={setDialog} title="Delete an attempt" onClose={onClose}>
      <Show when={attempt()}>
        {(attempt) => (
          <>
            <div class={sContent}>
              <span>Do you really want to delete the following attempt?</span>
              <AttemptsTable attempts={[attempt()]} showTime={false} />
            </div>
            <DialogFooterConfirm
              onConfirm={() => {
                onConfirm(attempt());
              }}
            />
          </>
        )}
      </Show>
    </Dialog>
  );
};
