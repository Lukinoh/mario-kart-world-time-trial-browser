import { Match, Switch } from "solid-js";
import { SymbolButton } from "../../ui/components/symbol-button";
import type { TimeTrial } from "../compositions/use-time-trial";
import { defineComponent } from "../../_core/utils/solid-js";

interface CaptureButtonProps {
  timeTrial: TimeTrial;
}

export const CaptureButton = defineComponent<CaptureButtonProps>((props) => {
  return (
    <Switch>
      <Match when={props.timeTrial.isState("PAUSED")}>
        <SymbolButton symbol="▶" onclick={props.timeTrial.start}>
          Capture
        </SymbolButton>
      </Match>
      <Match when={props.timeTrial.isState("STARTED")}>
        <SymbolButton symbol="⏹" onclick={props.timeTrial.pause}>
          Capture
        </SymbolButton>
      </Match>
    </Switch>
  );
});
