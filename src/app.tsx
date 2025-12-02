import { PROCESS_FRAME_MODE, useTimeTrial } from "./compositions/use-time-trial";
import { css } from "@emotion/css";
import { defineComponent } from "./tools/utils";
import { onMount } from "solid-js";

const sDebug = css({
  display: "grid",
  gridTemplateColumns: "50% 50%",
  gap: "1rem",
});

export const App = defineComponent(() => {
  const { start, videoElement, canvasElement, getState, attempt } = useTimeTrial();

  onMount(() => {
    start(PROCESS_FRAME_MODE.TIME_UPDATE);
  });

  return (
    <>
      <h1>Debug</h1>
      <div class={sDebug}>
        <div>
          <h2>Video</h2>
          {videoElement}
          {canvasElement}
        </div>
        <div>
          <h2>State</h2>
          <pre>
            <code>{getState()}</code>
          </pre>
          <h2>Raw data</h2>
          <pre>
            <code>{JSON.stringify(attempt.data, undefined, 2)}</code>
          </pre>
        </div>
      </div>
    </>
  );
});
