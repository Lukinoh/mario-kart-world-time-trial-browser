import * as v from "valibot";
import type { AttemptsEntityIssue, AttemptsEntitySchema } from "../../schemas/attempts-entity";
import { type Component, type JSX, createMemo, createSignal } from "solid-js";
import { Dialog, type DialogRef } from "../../../ui/components/dialog/dialog";
import { isFunction, isString } from "remeda";
import { AdaptativeButton } from "../../../ui/components/buttons/adaptative-button";
import { DialogFooterClose } from "../../../ui/components/dialog/footers/dialog-footer-close";
import { ValibotErrorContent } from "./valibot-error-content";
import { css } from "@emotion/css";

const sSuccess = css({
  margin: 0,
});

interface ValibotButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string;
  symbol?: string;
}

export const ValibotImportButton: Component<ValibotButtonProps> = (props) => {
  let dialogSuccess!: DialogRef; // oxlint-disable-line init-declarations no-unassigned-vars
  let dialogError!: DialogRef; // oxlint-disable-line init-declarations no-unassigned-vars
  const [data, setData] = createSignal<Array<AttemptsEntityIssue> | undefined>(undefined);

  const args = createMemo<JSX.ButtonHTMLAttributes<HTMLButtonElement>>(() => {
    return {
      ...props,
      onClick: async (event): Promise<void> => {
        if (isFunction(props.onClick)) {
          try {
            await Promise.try(props.onClick, event);
            setData();
            dialogSuccess.open();
          } catch (error) {
            if (v.isValiError<typeof AttemptsEntitySchema>(error)) {
              setData(error.issues);
              dialogError.open();
            } else if (isString(error)) {
              // Usually happen when the select file window is closed
              console.info(`Import window was ${error}`);
            } else {
              setData([
                {
                  type: "string",
                  kind: "schema",
                  input: "An unknown error",
                  expected: "string",
                  received: "An error",
                  message: error?.toString() ?? "Critical error",
                },
              ]);
              dialogError.open();
            }
          }
        }
      },
    };
  });

  return (
    <>
      <AdaptativeButton {...args()} symbol={props.symbol}>
        {props.children}
      </AdaptativeButton>
      <Dialog ref={dialogSuccess}>
        <p class={sSuccess}>Import completed successfully</p>
        <DialogFooterClose />
      </Dialog>
      <Dialog ref={dialogError} title="An error happened during import">
        <ValibotErrorContent issues={data() ?? []} />
        <DialogFooterClose />
      </Dialog>
    </>
  );
};
