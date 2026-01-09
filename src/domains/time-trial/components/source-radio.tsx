import { createEffect, createSelector, createSignal } from "solid-js";
import { defineComponent } from "../../_core/utils/solid-js";
import { useSettingsRepository } from "../../database/compositions/use-settings-repository";
import { useTimeTrial } from "../compositions/use-time-trial";

export type SourceRadioType = "file" | "camera";

interface SourceRadioProps {
  onError?: (error: unknown) => void;
  onSelected?: (source: SourceRadioType) => void;
}

export const SourceRadio = defineComponent<SourceRadioProps>((props) => {
  const groupRadioName = "video-mode";

  const timeTrial = useTimeTrial();
  const settings = useSettingsRepository();

  const [radio, setRadio] = createSignal<SourceRadioType>("camera");
  const isSelected = createSelector(radio);

  createEffect(async () => {
    if (import.meta.env.DEV && settings.player().startsWith("DEBUG")) {
      // Load pre-defined videos in dev only if the username is DEBUG
      settings.setIsDebug(true);
      settings.setVideoVisible(true);
      const { getDebugVideoUrl } = await import("../../test/utils/get-debug-video-url");
      timeTrial.fromUrl(getDebugVideoUrl(settings.player()));
      setRadio("file");
    } else {
      await onCamera();
    }
  });

  createEffect(() => {
    props.onSelected?.(radio());
  });

  const onCamera = async (): Promise<void> => {
    try {
      setRadio("camera");
      await timeTrial.fromCamera();
    } catch (error) {
      props.onError?.(error);
    }
  };

  const onFile = async (): Promise<void> => {
    try {
      await timeTrial.fromFile();
      setRadio("file");
    } catch {
      // If fromFile was canceled, we have to force rerender, otherwise the select stays on file.
      setRadio("file");
      setRadio("camera");
    }
  };

  return (
    <div>
      <span>Source {radio()}</span>
      <label>
        <input checked={isSelected("camera")} onchange={onCamera} name={groupRadioName} type="radio" />
        <span>Capture Card</span>
      </label>
      <label>
        <input checked={isSelected("file")} onchange={onFile} name={groupRadioName} type="radio" />
        <span>File</span>
      </label>
    </div>
  );
});
