import type { TimeTrial } from "../compositions/use-time-trial";
import type { ViewProps } from "../core/view-props";
import { css } from "@emotion/css";
import { defineComponent } from "../tools/utils";
import { onMount } from "solid-js";
import { useStorage } from "../compositions/storage/use-storage";

const sDebug = css({
  display: "grid",
  gridTemplateColumns: "50% 50%",
  gap: "1rem",
});

interface DebugProps extends ViewProps {
  timeTrial: TimeTrial;
}

export const Debug = defineComponent<DebugProps>((props) => {
  const storage = useStorage();

  onMount(() => {
    props.setTitle("Debug");
  });

  return (
    <>
      <label for="input_player">Player:</label>
      <input
        id="input_player"
        type="text"
        value={storage.personal.player()}
        onInput={(event) => {
          storage.personal.setPlayer(event.target.value);
        }}
      />
      <div class={sDebug}>
        <button onclick={props.timeTrial.start}>Start capture</button>
        <button onclick={props.timeTrial.pause}>Pause capture</button>
      </div>
      <div>
        <h2>Raw data</h2>
        <div class={sDebug}>
          <div>
            <h3>Last Attempt</h3>
            <pre>
              <code>{JSON.stringify(storage.personal.lastAttempt(), undefined, 2)}</code>
            </pre>
          </div>

          <div>
            <h3>All</h3>
            <pre>
              <code>{JSON.stringify(storage.personal.attempts(), undefined, 2)}</code>
            </pre>
          </div>
        </div>
      </div>
    </>
  );
});
