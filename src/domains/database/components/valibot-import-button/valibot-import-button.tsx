import * as v from "valibot";
import type { AttemptsEntityIssue, AttemptsEntitySchema } from "../../schemas/attempts-entity";
import { type Component, type JSX, createMemo, createSignal } from "solid-js";
import { isFunction, isString } from "remeda";
import { Dialog } from "../../../ui/components/dialog";
import { ValibotErrorContent } from "./valibot-error-content";
import { css } from "@emotion/css";

const sSuccess = css({
  margin: 0,
});

interface ValibotButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export const ValibotImportButton: Component<ValibotButtonProps> = (props) => {
  // oxlint-disable-next-line init-declarations no-unassigned-vars
  let dialogSuccess!: HTMLDialogElement;
  // oxlint-disable-next-line init-declarations no-unassigned-vars
  let dialogError!: HTMLDialogElement;
  const [data, setData] = createSignal<Array<AttemptsEntityIssue> | undefined>(undefined);

  const args = createMemo<JSX.ButtonHTMLAttributes<HTMLButtonElement>>(() => {
    return {
      ...props,
      onClick: async (event): Promise<void> => {
        if (isFunction(props.onClick)) {
          try {
            await Promise.try(props.onClick, event);
            setData();
            dialogSuccess.showModal();
          } catch (error) {
            if (v.isValiError<typeof AttemptsEntitySchema>(error)) {
              setData(error.issues);
              dialogError.showModal();
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
              dialogError.showModal();
            }
          }
        }
      },
    };
  });

  return (
    <>
      <button {...args()}>{props.children}</button>
      <Dialog ref={dialogSuccess}>
        <p class={sSuccess}>Import completed successfully</p>
      </Dialog>
      <Dialog ref={dialogError} title="An error happened during import">
        <ValibotErrorContent issues={data() ?? []} />
      </Dialog>
    </>
  );
};
