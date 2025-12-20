import { css } from "@emotion/css";
import { defineComponent } from "../tools/utils";
import { useStorage } from "../compositions/storage/use-storage";
import type { useTimeTrial } from "../compositions/use-time-trial";

const sDebug = css({
  display: "grid",
  gridTemplateColumns: "50% 50%",
  gap: "1rem",
});

interface DebugProps {
  timeTrial: ReturnType<typeof useTimeTrial>;
}

export const Debug = defineComponent<DebugProps>((props) => {
  const storage = useStorage();

  return (
    <>
      <h2>Debug</h2>
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
        <h2>Video</h2>
        <div class={sDebug}>
          {props.timeTrial.video}
          {props.timeTrial.canvas}
        </div>

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
