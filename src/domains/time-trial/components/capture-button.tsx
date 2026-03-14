import { type Component, Match, Switch } from "solid-js";
import { SymbolTextButton } from "../../ui/components/buttons/symbol-text-button";
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
        <SymbolTextButton symbol="▶" onClick={onPlay}>
          Capture
        </SymbolTextButton>
      </Match>
      <Match when={timeTrial.isState("PLAYING")}>
        <SymbolTextButton symbol="⏹" onClick={onPause}>
          Capture
        </SymbolTextButton>
      </Match>
      <Match when={timeTrial.isState("LOADING")}>
        <SymbolTextButton symbol="⏳" disabled>
          Capture
        </SymbolTextButton>
      </Match>
    </Switch>
  );
};
