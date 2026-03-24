import { type Component, useContext } from "solid-js";
import { DialogContext } from "../dialog-context";
import { css } from "@emotion/css";

const sFooter = css({
  display: "flex",
  justifyContent: "flex-end",
  gap: "var(--mk-spacing-medium)",
});

interface DialogFooterConfirmProps {
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const DialogFooterConfirm: Component<DialogFooterConfirmProps> = (props) => {
  const dialog = useContext(DialogContext);

  const onConfirm = (): void => {
    props.onConfirm?.();
    dialog?.close();
  };

  const onCancel = (): void => {
    props.onCancel?.();
    dialog?.close();
  };

  return (
    <div slot="footer" class={sFooter}>
      <button class="secondary" onClick={onCancel}>
        Cancel
      </button>
      <button onClick={onConfirm}>Confirm</button>
    </div>
  );
};
