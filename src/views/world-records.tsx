import { AttemptsTable } from "../components/attempts-table/attempts-table";
import { Cell } from "../components/grid-utilities/cell";
import { ValibotImportButton } from "../components/valibot-button/valibot-import-button";
import { css } from "@emotion/css";
import { defineComponent } from "../tools/utils";
import { useWorldRecordStorage } from "../compositions/storage/use-world-records-storage";

const sGrid = css({
  display: "grid",
  gridTemplateColumns: `1fr 2fr`,
  textAlign: "left",
  "*": {
    padding: "var(--mk-spacing-medium)",
  },
  width: "100%",
});

export const WorldRecords = defineComponent(() => {
  const storage = useWorldRecordStorage();

  return (
    <>
      <h1>World Records</h1>
      <p>The refresh of the world records can be either be done automatically or manually.</p>
      <div class={sGrid}>
        <Cell bold text="Automatic" />
        <Cell bold text="Manual" />
        <div>
          <ValibotImportButton onclick={storage.automaticProcessForMkrws}>Refresh</ValibotImportButton>
          <div>powered by codetabs.com</div>
        </div>
        <dl>
          <dt>Step 1</dt>
          <dd>
            <button onclick={storage.manualProcessForMkwrs}>Copy some code to your clipboard and open mkwrs.com</button>
          </dd>
          <dt>Step 2</dt>
          <dd>
            Open the devtools of your browser (i.e. F12), paste your clipboard in the console, and press enter. It will
            download a JSON file with all the world records.
          </dd>
          <dt>Step 3</dt>
          <dd>
            <ValibotImportButton onclick={storage.restore}>Import the JSON file</ValibotImportButton>
          </dd>
        </dl>
      </div>

      <AttemptsTable attempts={storage.attempts()} showTime={false} />
    </>
  );
});
