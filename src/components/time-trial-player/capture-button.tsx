import { Match, Switch } from "solid-js";
import type { TimeTrial } from "../../compositions/use-time-trial";
import { css } from "@emotion/css";
import { defineComponent } from "../../core/helpers/solid-js";

const sButton = css({
  marginBottom: 0,
});

interface CaptureButtonProps {
  timeTrial: TimeTrial;
}

export const CaptureButton = defineComponent<CaptureButtonProps>((props) => {
  return (
    <>
      <Switch>
        <Match when={props.timeTrial.isState("PAUSED")}>
          <button class={sButton} onClick={props.timeTrial.start}>
            ▶ Capture
          </button>
        </Match>
        <Match when={props.timeTrial.isState("STARTED")}>
          <button class={sButton} onclick={props.timeTrial.pause}>
            ⏹ Capture
          </button>
        </Match>
      </Switch>
    </>
  );
});
