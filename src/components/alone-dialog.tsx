import { Dialog } from "./dialog";
import { createEffect } from "solid-js";
import { defineComponent } from "../domains/_core/utils/solid-js";
import { useAlone } from "../compositions/use-alone";

export const AloneDialog = defineComponent(() => {
  // oxlint-disable-next-line init-declarations no-unassigned-vars
  let dialog!: HTMLDialogElement;
  const { alone } = useAlone();

  createEffect(() => {
    if (!alone()) {
      dialog.showModal();
    }
  });

  return (
    <Dialog ref={dialog} showFooter={false}>
      <p>The application is open in several tabs, and it is not meant to be open in several tabs.</p>
      <p>Please close all other tabs and refresh this page, or use the already open tab, and close this one.</p>
    </Dialog>
  );
});
