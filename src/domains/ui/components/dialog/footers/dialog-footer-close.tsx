import { type Component, type Ref, useContext } from "solid-js";
import { DialogContext } from "../dialog-context";

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
    <button slot="footer" onClick={onClose}>
      Close
    </button>
  );
};
