import { type ViewProps, defineComponent } from "../core/helpers/solid-js";
import { AttemptsTable } from "../components/attempts-table/attempts-table";
import { Cell } from "../components/grid-utilities/cell";
import { GridColumn } from "../components/grid-utilities/grid-column";
import { ValibotImportButton } from "../components/valibot-button/valibot-import-button";
import { css } from "@emotion/css";
import { onMount } from "solid-js";
import { useWorldRecordStorage } from "../domains/storages/compositions/use-world-records-storage";

const sWrapper = css({
  width: "min-content",
});

const sNoWrap = css({
  whiteSpace: "nowrap",
});

export const WorldRecords = defineComponent<ViewProps>((props) => {
  const storage = useWorldRecordStorage();

  onMount(() => {
    props.setTitle("Worlds Records");
  });

  return (
    <>
      <div class={sWrapper}>
        <p>The refresh of the world records can be either be done automatically or manually.</p>
        <GridColumn template="1fr 2fr" xAlign="left">
          <Cell bold text="Automatic" />
          <Cell bold text="Manual" />
          <div>
            <ValibotImportButton onclick={storage.automaticProcessForMkrws}>Refresh</ValibotImportButton>
            <div class={sNoWrap}>powered by codetabs.com</div>
          </div>
          <dl>
            <dt>Step 1</dt>
            <dd>
              <button class={sNoWrap} onclick={storage.manualProcessForMkwrs}>
                Copy some code to your clipboard and open mkwrs.com
              </button>
            </dd>
            <dt>Step 2</dt>
            <dd>
              Open the devtools of your browser (i.e. F12), paste your clipboard in the console, and press enter. It
              will download a JSON file with all the world records.
            </dd>
            <dt>Step 3</dt>
            <dd>
              <ValibotImportButton onclick={storage.replaceFromJSON}>Import the JSON file</ValibotImportButton>
            </dd>
          </dl>
        </GridColumn>
        <AttemptsTable attempts={storage.attempts()} showTime={false} showFilters={false} />
      </div>
    </>
  );
});
