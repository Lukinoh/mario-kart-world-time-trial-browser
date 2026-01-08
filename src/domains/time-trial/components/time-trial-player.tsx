import { Match, Show, Switch, createEffect, createMemo, createSignal } from "solid-js";
import { Dialog } from "../../ui/components/dialog";
import { GridColumn } from "../../ui/components/grid/grid-column";
import { SymbolButton } from "../../ui/components/symbol-button";
import { TextInput } from "../../ui/components/text-input";
import { css } from "@emotion/css";
import { defineComponent } from "../../_core/utils/solid-js";
import { displayVisible } from "../../ui/css/css";
import { fileUpload } from "../../_core/utils/file-upload";
import { useSettingsRepository } from "../../database/compositions/use-settings-repository";
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
  maxWidth: "fit-content",
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
  // oxlint-disable-next-line init-declarations no-unassigned-vars
  let dialog!: HTMLDialogElement;

  const timeTrial = useTimeTrial();
  const settings = useSettingsRepository();

  const [rawError, setRawError] = createSignal<string>();

  const sVideoVisible = createMemo(() => displayVisible(settings.isVideoVisible()));

  createEffect(async () => {
    if (import.meta.env.DEV && settings.player().startsWith("DEBUG")) {
      // Load a pre-defined video in dev only if the username is DEBUG
      settings.setIsDebug(true);
      settings.setVideoVisible(true);
      const { getDebugVideoUrl } = await import("../../test/utils/get-debug-video-url");
      timeTrial.fromUrl(getDebugVideoUrl(settings.player()));
    } else {
      await onCameraRadio();
    }
  });

  const onCameraRadio = async (): Promise<void> => {
    cameraRadio.checked = true;
    try {
      await timeTrial.fromCamera();
    } catch (error) {
      setError(error);
      dialog.showModal();
    }
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

  const onPlay = async (): Promise<void> => {
    try {
      await timeTrial.play();
    } catch (error) {
      setError(error);
      dialog.showModal();
    }
  };

  const setError = (error: unknown): void => {
    setRawError();
    if (error instanceof Error) {
      setRawError(error.toString());
    }
  };

  return (
    <>
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
          <Switch>
            <Match when={timeTrial.isState("PAUSED")}>
              <SymbolButton symbol="▶" onclick={onPlay}>
                Capture
              </SymbolButton>
            </Match>
            <Match when={timeTrial.isState("PLAYING")}>
              <SymbolButton symbol="⏹" onclick={timeTrial.pause}>
                Capture
              </SymbolButton>
            </Match>
          </Switch>
        </div>
        <div class={sVideoCanvas}>
          <div class={css(sVideoCanvasItem, sVideoVisible())}>{timeTrial.video}</div>
          <Show when={settings.isDebug()}>
            <div class={sVideoCanvasItem}>{timeTrial.canvas}</div>
          </Show>
        </div>
      </GridColumn>
      <Dialog ref={dialog} title="Failed to load the capture card source.">
        <p>Make sure you allowed the application to access the camera devices.</p>
        <p>Make sure your camera is not used by another application.</p>
        <details>
          <summary>Raw error</summary>
          {rawError()}
        </details>
      </Dialog>
    </>
  );
});
