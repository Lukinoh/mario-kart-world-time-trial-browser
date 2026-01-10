import { type Component, createEffect, createSelector, createSignal } from "solid-js";
import { useSettingsRepository } from "../../database/compositions/use-settings-repository";
import { useTimeTrial } from "../compositions/use-time-trial";

export type SourceRadioState = "FILE" | "CAMERA";

interface SourceRadioProps {
  onError?: (error: unknown) => void;
  onSelected?: (source: SourceRadioState) => void;
}

export const SourceRadio: Component<SourceRadioProps> = (props) => {
  const groupRadioName = "video-mode";

  const timeTrial = useTimeTrial();
  const settings = useSettingsRepository();

  const [radio, setRadio] = createSignal<SourceRadioState>("CAMERA");
  const isSelected = createSelector(radio);

  createEffect(async () => {
    if (import.meta.env.DEV && settings.player().startsWith("DEBUG")) {
      // Load pre-defined videos in dev only if the username is DEBUG
      settings.setIsDebug(true);
      settings.setVideoVisible(true);
      const { getDebugVideoUrl } = await import("../../test/utils/get-debug-video-url");
      timeTrial.fromUrl(getDebugVideoUrl(settings.player()));
      setRadio("FILE");
    } else {
      await onCamera();
    }
  });

  createEffect(() => {
    props.onSelected?.(radio());
  });

  const onCamera = async (): Promise<void> => {
    try {
      setRadio("CAMERA");
      await timeTrial.fromCamera();
    } catch (error) {
      props.onError?.(error);
    }
  };

  const onFile = async (): Promise<void> => {
    try {
      await timeTrial.fromFile();
      setRadio("FILE");
    } catch {
      // If fromFile was canceled, we have to force rerender, otherwise the select stays on file.
      setRadio("FILE");
      setRadio("CAMERA");
    }
  };

  return (
    <div>
      <span>Source</span>
      <label>
        <input checked={isSelected("CAMERA")} onChange={onCamera} name={groupRadioName} type="radio" />
        <span>Capture Card</span>
      </label>
      <label>
        <input checked={isSelected("FILE")} onChange={onFile} name={groupRadioName} type="radio" />
        <span>File</span>
      </label>
    </div>
  );
};
