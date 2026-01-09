import { Match, Switch } from "solid-js";
import { SymbolButton } from "../../ui/components/symbol-button";
import { defineComponent } from "../../_core/utils/solid-js";
import { useTimeTrial } from "../compositions/use-time-trial";

interface CaptureButton {
  onPlay?: () => void;
  onPause?: () => void;
  onError?: (error: unknown) => void;
}

export const CaptureButton = defineComponent<CaptureButton>((props) => {
  const timeTrial = useTimeTrial();

  const onPlay = async (): Promise<void> => {
    try {
      await timeTrial.play();
      props.onPlay?.();
    } catch (error) {
      props.onError?.(error);
    }
  };

  const onPause = (): void => {
    timeTrial.pause();
    props.onPlay?.();
  };

  return (
    <Switch>
      <Match when={timeTrial.isState("PAUSED")}>
        <SymbolButton symbol="▶" onclick={onPlay}>
          Capture
        </SymbolButton>
      </Match>
      <Match when={timeTrial.isState("PLAYING")}>
        <SymbolButton symbol="⏹" onclick={onPause}>
          Capture
        </SymbolButton>
      </Match>
    </Switch>
  );
});
