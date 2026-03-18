import { type Component, createEffect } from "solid-js";
import { Dialog, type DialogRef } from "../../../ui/components/dialog/dialog";
import { useAlone } from "./use-alone";

export const AloneDialog: Component = () => {
  // oxlint-disable-next-line init-declarations no-unassigned-vars
  let dialog!: DialogRef;
  const { alone } = useAlone();

  createEffect(() => {
    if (!alone()) {
      dialog.open();
    }
  });

  return (
    <Dialog ref={dialog} title="Application already open !">
      <p>The application is open in several tabs, and it is not meant to be open in several tabs.</p>
      <p>Please close all other tabs and refresh this page, or use the already open tab, and close this one.</p>
    </Dialog>
  );
};
