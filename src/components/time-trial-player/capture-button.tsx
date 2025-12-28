import { Match, Switch } from "solid-js";
import type { TimeTrial } from "../../compositions/use-time-trial";
import { defineComponent } from "../../core/helpers/solid-js";

interface CaptureButtonProps {
  timeTrial: TimeTrial;
}

export const CaptureButton = defineComponent<CaptureButtonProps>((props) => {
  return (
    <>
      <Switch>
        <Match when={props.timeTrial.isState("PAUSED")}>
          <button onClick={props.timeTrial.start}>Start capture</button>
        </Match>
        <Match when={props.timeTrial.isState("STARTED")}>
          <button onclick={props.timeTrial.pause}>Pause capture</button>
        </Match>
      </Switch>
    </>
  );
});
