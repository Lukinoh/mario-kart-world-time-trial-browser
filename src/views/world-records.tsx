import { type ViewProps, defineComponent } from "../domains/_core/utils/solid-js";
import { AttemptsTable } from "../domains/attempt/components/attempts-table";
import { Cell } from "../domains/ui/components/grid/cell";
import { GridColumn } from "../domains/ui/components/grid/grid-column";
import { ValibotImportButton } from "../domains/database/components/valibot-import-button/valibot-import-button";
import { cellCss } from "../domains/ui/css/cell-css";
import { css } from "@emotion/css";
import { onMount } from "solid-js";
import { useWorldRecordRepository } from "../domains/database/compositions/use-world-records-repository";

const sCellMode = cellCss({
  bold: true,
});

const sWrapper = css({
  width: "min-content",
});

const sNoWrap = css({
  whiteSpace: "nowrap",
});

export const WorldRecords = defineComponent<ViewProps>((props) => {
  const worldRecords = useWorldRecordRepository();

  onMount(() => {
    props.setTitle("Worlds Records");
  });

  return (
    <>
      <div class={sWrapper}>
        <p>The refresh of the world records can be either be done automatically or manually.</p>
        <GridColumn template="1fr 2fr" xAlign="left">
          <Cell text="Automatic" css={[sCellMode]} />
          <Cell text="Manual" css={[sCellMode]} />
          <div>
            <ValibotImportButton onClick={worldRecords.automaticProcessForMkrws}>Refresh</ValibotImportButton>
            <div class={sNoWrap}>powered by codetabs.com</div>
          </div>
          <dl>
            <dt>Step 1</dt>
            <dd>
              <button class={sNoWrap} onClick={worldRecords.manualProcessForMkwrs}>
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
              <ValibotImportButton onClick={worldRecords.replaceFromJSON}>Import the JSON file</ValibotImportButton>
            </dd>
          </dl>
        </GridColumn>
        <AttemptsTable attempts={worldRecords.attempts()} showTime={false} showFilters={false} />
      </div>
    </>
  );
});
