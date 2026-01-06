import { Show, createEffect, createMemo, onMount } from "solid-js";
import { CaptureButton } from "./capture-button";
import { GridColumn } from "../../ui/components/grid/grid-column";
import { TextInput } from "../../ui/components/text-input";
import { css } from "@emotion/css";
import { defineComponent } from "../../_core/utils/solid-js";
import { displayVisible } from "../../ui/css/css";
import { fileUpload } from "../../_core/utils/file-upload";
import { useSettingsStorage } from "../../storage/compositions/use-settings-storage";
import { useTimeTrial } from "../compositions/use-time-trial";

const sOptionsZone = css({
  display: "flex",
  alignItems: "center",
  whiteSpace: "nowrap",
  gap: "var(--mk-spacing-large)",
});

const sVideoCanvas = css({
  display: "flex",
  alignItems: "center",
  gap: "var(--mk-spacing-medium)",
});

const sVideoCanvasItem = css({
  position: "relative",
  width: "49%",
  lineHeight: 0,
  border: "var(--mk-border)",
  borderRadius: "var(--standard-border-radius)",
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

export const TimeTrialPlayer = defineComponent(() => {
  // oxlint-disable-next-line init-declarations no-unassigned-vars
  let cameraRadio!: HTMLInputElement;
  // oxlint-disable-next-line init-declarations no-unassigned-vars
  let fileRadio!: HTMLInputElement;

  const timeTrial = useTimeTrial();
  const settings = useSettingsStorage();

  const sVideoVisible = createMemo(() => displayVisible(settings.isVideoVisible()));

  onMount(async () => {
    await onCameraRadio();

    if (import.meta.env.DEV) {
      // Load a pre-defined video in dev only if the username is DEBUG
      createEffect(async () => {
        if (settings.player() === "DEBUG") {
          settings.setIsDebug(true);
          const demoVideo = await import("../../../assets/demo/demo.webm");
          timeTrial.fromUrl(demoVideo.default);
        }

        if (settings.player() !== "DEBUG") {
          await timeTrial.fromCamera();
        }
      });
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
    <GridColumn template={"auto"}>
      <div class={sOptionsZone}>
        <TextInput
          label="Player"
          placeholder="Set your name"
          value={settings.player()}
          onInput={(name) => {
            settings.setPlayer(name);
          }}
        />
        <div>
          <label>
            <input ref={cameraRadio} checked={true} onchange={onCameraRadio} name="video-mode" type="radio" />
            <span>Capture Card</span>
          </label>
          <label>
            <input ref={fileRadio} onchange={onFileRadio} name="video-mode" type="radio" />
            <span>File</span>
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={settings.isVideoVisible()}
              onchange={(event) => {
                settings.setVideoVisible(event.target.checked);
              }}
            />
            <span>Video</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={settings.isDebug()}
              onchange={(event) => {
                settings.setIsDebug(event.target.checked);
              }}
            />
            <span>Debug</span>
          </label>
        </div>
        <CaptureButton timeTrial={timeTrial} />
      </div>
      <div class={sVideoCanvas}>
        <div class={css(sVideoCanvasItem, sVideoVisible())}>{timeTrial.video}</div>
        <Show when={settings.isDebug()}>
          <div class={sVideoCanvasItem}>{timeTrial.canvas}</div>
        </Show>
      </div>
    </GridColumn>
  );
});
