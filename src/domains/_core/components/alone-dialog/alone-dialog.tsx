import { type Component, createEffect } from "solid-js";
import { Dialog } from "../../../ui/components/dialog";
import { useAlone } from "./use-alone";

export const AloneDialog: Component = () => {
  // oxlint-disable-next-line init-declarations no-unassigned-vars
  let dialog!: HTMLDialogElement;
  const { alone } = useAlone();

  createEffect(() => {
    if (!alone()) {
      dialog.showModal();
    }
  });

  return (
    <Dialog ref={dialog} showFooter={false} title="Application already open !">
      <p>The application is open in several tabs, and it is not meant to be open in several tabs.</p>
      <p>Please close all other tabs and refresh this page, or use the already open tab, and close this one.</p>
    </Dialog>
  );
};
