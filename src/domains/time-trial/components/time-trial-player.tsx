import { Show, onMount } from "solid-js";
import { CaptureButton } from "./capture-button";
import { Environment } from "../../_core/environment";
import { GridColumn } from "../../ui/components/grid/grid-column";
import { TextInput } from "../../ui/components/text-input";
import { css } from "@emotion/css";
import { defineComponent } from "../../_core/utils/solid-js";
import { fileUpload } from "../../_core/utils/file-upload";
import { useTimeTrial } from "../compositions/use-time-trial";

const sOptionsZone = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "var(--mk-spacing-large)",
});

const sVideoCanvas = css({
  "> div, > canvas": {
    position: "relative",
    width: "49%",
    minWidth: "15rem",
    height: "fit-content",
    lineHeight: 0,
    border: "var(--mk-border)",
    borderRadius: "var(--standard-border-radius)",
  },
  "> div": {
    "::before": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: -1,
      content: "'Capture Video'",
    },
  },
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "var(--mk-spacing-medium)",
});

export const TimeTrialPlayer = defineComponent(() => {
  const timeTrial = useTimeTrial();
  // oxlint-disable-next-line init-declarations no-unassigned-vars
  let cameraRadio!: HTMLInputElement;
  // oxlint-disable-next-line init-declarations no-unassigned-vars
  let fileRadio!: HTMLInputElement;

  onMount(async () => {
    if (import.meta.env.DEV && Environment.isDebug) {
      const demoVideo = await import("../../../assets/demo/demo.webm");
      timeTrial.fromUrl(demoVideo.default);
    } else {
      await onCameraRadio();
    }
  });

  const onCameraRadio = async (): Promise<void> => {
    cameraRadio.checked = true;
    await timeTrial.fromCamera();
  };

  const onFileRadio = async (): Promise<void> => {
    try {
      const file = await fileUpload("video/*");
      fileRadio.checked = true;
      timeTrial.fromFile(file);
    } catch {
      cameraRadio.checked = true;
    }
  };

  return (
    <GridColumn template={"10rem 1fr"}>
      <div class={sOptionsZone}>
        <TextInput
          label="Player"
          placeholder="Set your name"
          value={timeTrial.player()}
          setValue={timeTrial.setPlayer}
        />
        <div>
          <label for="camera-radio">
            <input
              ref={cameraRadio}
              id="camera-radio"
              checked={true}
              onClick={onCameraRadio}
              name="video-mode"
              type="radio"
            />
            <span>Capture Card</span>
          </label>
          <label for="file-radio">
            <input ref={fileRadio} id="file-radio" onClick={onFileRadio} name="video-mode" type="radio" />
            <span>File</span>
          </label>
        </div>
        <CaptureButton timeTrial={timeTrial} />
      </div>
      <div class={sVideoCanvas}>
        <div>{timeTrial.video}</div>
        <Show when={Environment.isDebug}>{timeTrial.canvas}</Show>
      </div>
    </GridColumn>
  );
});
