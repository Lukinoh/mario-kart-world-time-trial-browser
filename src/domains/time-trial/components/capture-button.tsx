import { type Component, Match, Switch } from "solid-js";
import { SymbolButton } from "../../ui/components/symbol-button";
import { useTimeTrial } from "../compositions/use-time-trial";

interface CaptureButton {
  onPlay?: () => void;
  onPause?: () => void;
  onError?: (error: unknown) => void;
}

export const CaptureButton: Component<CaptureButton> = (props) => {
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
        <SymbolButton symbol="▶" onClick={onPlay}>
          Capture
        </SymbolButton>
      </Match>
      <Match when={timeTrial.isState("PLAYING")}>
        <SymbolButton symbol="⏹" onClick={onPause}>
          Capture
        </SymbolButton>
      </Match>
    </Switch>
  );
};
