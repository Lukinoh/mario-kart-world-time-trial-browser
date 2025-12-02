import { css } from "@emotion/css";
import { defineComponent } from "../tools/utils";
import type { useTimeTrial } from "../compositions/use-time-trial";

const sDebug = css({
  display: "grid",
  gridTemplateColumns: "50% 50%",
  gap: "1rem",
});

interface DebugProps {
  timeTrial: ReturnType<typeof useTimeTrial>;
}

export const Debug = defineComponent<DebugProps>((props) => (
  <>
    <h2>Debug</h2>
    <button onClick={props.timeTrial.start}>Start capture</button>
    <div class={sDebug}>
      <div>
        <h2>Video</h2>
        {props.timeTrial.videoElement}
        {props.timeTrial.canvasElement}
      </div>
      <div>
        <h2>State</h2>
        <pre>
          <code>{props.timeTrial.getState()}</code>
        </pre>
        <h2>Raw data</h2>
        <pre>
          <code>{JSON.stringify(props.timeTrial.attempt.data, undefined, 2)}</code>
        </pre>
      </div>
    </div>
  </>
));
