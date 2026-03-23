import { type Component, type Ref, useContext } from "solid-js";
import { DialogContext } from "../dialog-context";
import { css } from "@emotion/css";

const sFooter = css({
  display: "flex",
  justifyContent: "flex-end",
  gap: "var(--mk-spacing-medium)",
  "> button": {
    marginBottom: 0,
  },
});

interface DialogFooterCloseProps {
  onClose?: () => void;
  ref?: Ref<HTMLDialogElement>;
}

export const DialogFooterClose: Component<DialogFooterCloseProps> = (props) => {
  const dialog = useContext(DialogContext);

  const onClose = (): void => {
    props.onClose?.();
    dialog?.close();
  };

  return (
    <div slot="footer" class={sFooter}>
      <button onClick={onClose}>Close</button>
    </div>
  );
};
