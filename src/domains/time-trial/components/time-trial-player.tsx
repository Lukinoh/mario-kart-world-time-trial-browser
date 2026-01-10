import { type Component, Show, createMemo, createSelector, createSignal } from "solid-js";
import { SourceRadio, type SourceRadioState } from "./source-radio";
import { displayVisible, span } from "../../ui/css/css";
import { CaptureButton } from "./capture-button";
import { Cell } from "../../ui/components/grid/cell";
import { Dialog } from "../../ui/components/dialog";
import { FeedbackCheckbox } from "./feedback-checkbox";
import { GridColumn } from "../../ui/components/grid/grid-column";
import { ObsButton } from "../../obs/components/obs-button";
import { PlaybackRateSelect } from "./playback-rate-select";
import { PlayerInput } from "./player-input";
import { css } from "@emotion/css";
import { useSettingsRepository } from "../../database/compositions/use-settings-repository";
import { useTimeTrial } from "../compositions/use-time-trial";

const sGrid = css({
  whiteSpace: "nowrap",
});

const sOptionsZone = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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

export const TimeTrialPlayer: Component = () => {
  // oxlint-disable-next-line init-declarations no-unassigned-vars
  let dialog!: HTMLDialogElement;

  const timeTrial = useTimeTrial();
  const settings = useSettingsRepository();

  const [rawError, setRawError] = createSignal<string>();
  const [source, setSource] = createSignal<SourceRadioState>("CAMERA");
  const isSource = createSelector(source);
  const sVideoVisible = createMemo(() => displayVisible(settings.isVideoVisible()));

  const onError = (error: unknown): void => {
    setRawError(error?.toString());
    dialog.showModal();
  };

  return (
    <>
      <GridColumn class={sGrid} template={"min-content min-content min-content auto"}>
        <PlayerInput />
        <SourceRadio onError={onError} onSelected={setSource} />
        <div class={sOptionsZone}>
          <Show when={isSource("FILE")}>
            <button onClick={timeTrial.fromFile}>Load file</button>
          </Show>
        </div>
        <Cell text="" />

        <div class={sOptionsZone}>
          <CaptureButton onError={onError} />
          <ObsButton />
        </div>
        <FeedbackCheckbox />
        <Show when={isSource("FILE")}>
          <PlaybackRateSelect />
        </Show>
        <Cell text="" />

        <div class={css(sVideoCanvas, span(4, 1))}>
          <div class={css(sVideoCanvasItem, sVideoVisible())}>{timeTrial.video}</div>
          <Show when={settings.isDebug()}>
            <div class={sVideoCanvasItem}>{timeTrial.canvas}</div>
          </Show>
        </div>
      </GridColumn>
      <Dialog ref={dialog} title="Failed to load the capture card source.">
        <p>Make sure you allowed the application to access the camera devices.</p>
        <p>Make sure your camera is not used by another application.</p>
        <p>
          Then{" "}
          <a
            href={location.href}
            onClick={() => {
              location.reload();
            }}
          >
            reload
          </a>{" "}
          the application.
        </p>

        <details>
          <summary>Raw error</summary>
          {rawError()}
        </details>
      </Dialog>
    </>
  );
};
