import { AttemptsTable } from "../components/attempts-table";
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
        <button onClick={props.timeTrial.start}>Start capture</button>
        <button onClick={props.timeTrial.pause}>Pause capture</button>
      </div>
      <div>
        <h2>Video</h2>
        <div class={sDebug}>
          {props.timeTrial.video}
          {props.timeTrial.canvas}
        </div>

        <h3>All attempts ({storage.personal.attemptsNumber()})</h3>
        <AttemptsTable attempts={storage.personal.attempts()}></AttemptsTable>

        <h3>World Records</h3>
        <AttemptsTable attempts={storage.worldRecords.attempts()}></AttemptsTable>

        <h2>MKWorld WR</h2>
        <div>
          <div class={sDebug}>
            <div>
              <p>
                First, try the automatic progress to import the World Records. If it does not work, try the manual way.
              </p>
            </div>
            <div>
              <p>The World Records must be imported manually.</p>
              <ol>
                <li>
                  Click on <strong>Manually way</strong>
                </li>
                <li>Open the Dev Tools</li>
                <li>Paste on the console, it will download a file</li>
                <li>Import the file in the World records</li>
              </ol>
            </div>
          </div>

          <div class={sDebug}>
            <button onClick={storage.worldRecords.automaticProcessForMkrws}>
              Automatic way (powered by codetabs.com)
            </button>
            <button onClick={storage.worldRecords.manualProcessForMkwrs}>Manual way</button>
          </div>
        </div>

        <h2>Extractors</h2>
        <div class={sDebug}>
          <button onClick={storage.personal.download}>Extract Personal</button>
          <button onClick={storage.personal.downloadForFriends}>Extract Personal for Friends</button>
          <button onClick={storage.personal.restore}>Restore Personal</button>
          <button onClick={storage.friends.download}>Extract Friends</button>
          <button onClick={storage.friends.restore}>Restore Friends</button>
          <button onClick={storage.worldRecords.download}>Extract World Records</button>
          <button onClick={storage.worldRecords.restore}>Restore Worlds Records</button>
          <button onClick={storage.download}>Extract All</button>
          <button onClick={storage.restore}>Restore All</button>
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
