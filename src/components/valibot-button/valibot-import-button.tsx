import * as v from "valibot";
import type { AttemptsStorageIssue, AttemptsStorageSchema } from "../../domains/storages/schemas/attempts-storage";
import { type JSX, Match, Switch, createMemo, createSignal } from "solid-js";
import { isFunction, isString } from "remeda";
import { Dialog } from "../dialog";
import { ValibotErrorContent } from "./valibot-error-content";
import { defineComponent } from "../../core/helpers/solid-js";

interface ValibotButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export const ValibotImportButton = defineComponent<ValibotButtonProps>((props) => {
  // oxlint-disable-next-line init-declarations no-unassigned-vars
  let dialog!: HTMLDialogElement;
  const [data, setData] = createSignal<Array<AttemptsStorageIssue> | undefined>(undefined);

  const args = createMemo<JSX.ButtonHTMLAttributes<HTMLButtonElement>>(() => {
    return {
      ...props,
      onclick: async (even): Promise<void> => {
        if (isFunction(props.onclick)) {
          try {
            await Promise.try(props.onclick, even);
            setData();
            dialog.showModal();
          } catch (error) {
            if (v.isValiError<typeof AttemptsStorageSchema>(error)) {
              setData(error.issues);
              dialog.showModal();
            } else if (isString(error)) {
              console.info(`Import window was ${error}`);
            } else {
              setData([
                {
                  type: "string",
                  kind: "schema",
                  input: "An unknown error",
                  expected: "string",
                  received: "An error",
                  message: JSON.stringify(error),
                },
              ]);
              dialog.showModal();
            }
          }
        }
      },
    };
  });

  return (
    <>
      <button {...args()}>{props.children}</button>
      <Dialog ref={dialog}>
        <Switch>
          <Match when={!data()}>
            <div>Import completed successfully</div>
          </Match>
          <Match when={data()}>{(issues) => <ValibotErrorContent issues={issues()} />}</Match>
        </Switch>
      </Dialog>
    </>
  );
});
