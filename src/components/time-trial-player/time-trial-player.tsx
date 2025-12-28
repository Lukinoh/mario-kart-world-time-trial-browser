import { Show, onMount } from "solid-js";
import { CaptureButton } from "./capture-button";
import { GridColumn } from "../grid-utilities/grid-column";
import type { TimeTrial } from "../../compositions/use-time-trial";
import { css } from "@emotion/css";
import { defineComponent } from "../../tools/utils";
import demoVideo from "../../assets/demo/demo.webm";
import { fileUpload } from "../../core/helpers/file-upload";

const sVideoZone = css({
  position: "relative",
  "> video": {
    border: "var(--mk-border)",
  },
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
});

const sCanvasZone = css({
  "> canvas": {
    border: "var(--mk-border)",
  },
});

interface TimeTrialPlayerProps {
  timeTrial: TimeTrial;
  isDebug: boolean;
}

export const TimeTrialPlayer = defineComponent<TimeTrialPlayerProps>((props) => {
  // oxlint-disable-next-line init-declarations no-unassigned-vars
  let cameraRadio!: HTMLInputElement;
  // oxlint-disable-next-line init-declarations no-unassigned-vars
  let fileRadio!: HTMLInputElement;

  onMount(async () => {
    if (props.isDebug) {
      props.timeTrial.fromUrl(demoVideo);
    } else {
      await onCameraRadio();
    }
  });

  const onCameraRadio = async (): Promise<void> => {
    cameraRadio.checked = true;
    await props.timeTrial.fromCamera();
  };

  const onFileRadio = async (): Promise<void> => {
    try {
      const file = await fileUpload("video/*");
      fileRadio.checked = true;
      props.timeTrial.fromFile(file);
    } catch {
      cameraRadio.checked = true;
    }
  };

  return (
    <GridColumn template={"10rem 1fr 1fr"} align="left">
      <div>
        <CaptureButton timeTrial={props.timeTrial}></CaptureButton>
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
      <div class={sVideoZone}>{props.timeTrial.video}</div>
      <Show when={props.isDebug}>
        <div class={sCanvasZone}>{props.timeTrial.canvas}</div>
      </Show>
    </GridColumn>
  );
});
