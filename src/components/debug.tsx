import { AttemptsTable } from "./attempts-table";
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
    <div>
      <h2>Video</h2>
      <div class={sDebug}>
        {props.timeTrial.video}
        {props.timeTrial.canvas}
      </div>

      <AttemptsTable attempts={props.timeTrial.attempts()}></AttemptsTable>

      <h2>Raw data</h2>
      <div class={sDebug}>
        <div>
          <h3>Last Attempt</h3>
          <pre>
            <code>{JSON.stringify(props.timeTrial.attempt(), undefined, 2)}</code>
          </pre>
        </div>

        <div>
          <h3>All</h3>
          <pre>
            <code>{JSON.stringify(props.timeTrial.attempts(), undefined, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  </>
));
