import { A } from "@solidjs/router";
import { Cell } from "../../domains/ui/components/grid/cell";
import type { Component } from "solid-js";
import { GridColumn } from "../../domains/ui/components/grid/grid-column";
import { WORLD_RECORD_URL } from "../../domains/_core/constants/external-urls";
import { cellCss } from "../../domains/ui/css/cell-css";

const sBold = cellCss({
  bold: true,
});

export const FaqGeneral: Component = () => {
  return (
    <>
      <h3>General</h3>

      <details>
        <summary>
          What are the options <em>Display</em> for?
        </summary>
        <p>
          The option <em>Video</em> gives you visual feedback on what is being captured. It is not necessary to have it
          enabled.
        </p>
        <p>
          The option <em>Debug</em> displays the video with an overlay of the recognized data.
        </p>
      </details>

      <details>
        <summary>How do I read the comparison table?</summary>
        <h4>Acronyms</h4>
        <GridColumn template={`max-content max-content`} spacing="small">
          <Cell text="Last" css={[sBold]} />
          <Cell text="Your last attempt" />
          <Cell text="WR" css={[sBold]} />
          <Cell text="World record" />
          <Cell text="PB" css={[sBold]} />
          <Cell text="Personal Best" />
          <Cell text="BPS" css={[sBold]} />
          <Cell text="Best Personal Splits - Look at all your attempts, and for each split it takes the best one." />
          <Cell text="FB" css={[sBold]} />
          <Cell text="Friend Best - Display the best attempt among your friends" />
          <Cell text="ΣS" css={[sBold]} />
          <Cell text="The sum of the splits" />
          <Cell text="ΔS" css={[sBold]} />
          <Cell text="The difference between two splits" />
          <Cell text="ΔΣS" css={[sBold]} />
          <Cell text="The difference between two sums of splits" />
        </GridColumn>
        <h4>Colors</h4>
        <p>
          For the <strong>Last</strong> row, the colors are inspired by F1
        </p>
        <ul>
          <li style="color: var(--mk-f1-purple)">Purple: The time is better than the WR</li>
          <li style="color: var(--mk-f1-green)">Green: The time is better than your BPS</li>
          <li>White: The time is better than your PB</li>
          <li style="color: var(--mk-f1-yellow)">Yellow: The time is worse or equal than your PB</li>
        </ul>
        <p>For the other line, the colors and meanings are similar to Mario Kart World.</p>
      </details>

      <details>
        <summary>
          Why the number of <em>Tries</em> does not correspond to the number of lines in History page?
        </summary>
        <p>
          The number of tries takes into account the discarded attempts from the <em>Shrink</em> action.
        </p>
      </details>

      <details>
        <summary>
          What does the <em>Add</em> action do?
        </summary>
        <p>It merges the input data with the current data and removes duplicates.</p>
        <p>For the History page, the number of tries is also merged.</p>
      </details>

      <details>
        <summary>
          What does the <em>Shrink</em> action do?
        </summary>
        <p>It cleans the data to keep only the relevant ones. The number of tries is not affected.</p>
        <ul>
          <li>
            On the History page, it keeps all your best time records and the best split records; everything else is
            discarded.
          </li>
          <li>On the Friends page, it keeps only the best time records.</li>
        </ul>
      </details>

      <details>
        <summary>How do I share my best time with my friends?</summary>
        <p>
          You have to go on the History page and click on <em>Export for friends</em>. Send the downloaded JSON to your
          friend, and (s)he can import it using the <em>Add</em> button on the Friends page.
        </p>
        <p>Note that only the best friend time is displayed in the comparison table.</p>
      </details>

      <details>
        <summary>How can I import my current records?</summary>
        <p>The simplest way is to play your ghosts. It will take some time, but it works.</p>
        <p>
          Alternatively, you could modify the database manually by exporting your history and adding the necessary
          values manually. Do some time trial to see the expected data structure. The names of the tracks correspond
          exactly to the one used by{" "}
          <A target="_blank" href={WORLD_RECORD_URL}>
            mkwrs.com
          </A>
          .
        </p>
        <p>
          This is more technical, and implies the fact that you already know your splits (time, shrooms, and coins).
        </p>
      </details>
    </>
  );
};
