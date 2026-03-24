import { type Component, useContext } from "solid-js";
import { DialogContext } from "../dialog-context";
import { css } from "@emotion/css";

const sFooter = css({
  display: "flex",
  justifyContent: "flex-end",
  gap: "var(--mk-spacing-medium)",
});

export const DialogFooterClose: Component = () => {
  const dialog = useContext(DialogContext);

  const onClose = (): void => {
    dialog?.close();
  };

  return (
    <div slot="footer" class={sFooter}>
      <button onClick={onClose}>Close</button>
    </div>
  );
};
