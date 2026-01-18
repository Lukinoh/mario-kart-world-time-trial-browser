import { Cell } from "../../domains/ui/components/grid/cell";
import type { Component } from "solid-js";
import { GridColumn } from "../../domains/ui/components/grid/grid-column";
import { cellCss } from "../../domains/ui/css/cell-css";

const sBold = cellCss({
  bold: true,
});

export const FaqApplication: Component = () => {
  return (
    <>
      <h3>Application</h3>

      <details>
        <summary>How do I read the comparison of Live page?</summary>
        <h4>Acronyms</h4>
        <GridColumn template={`max-content max-content`}>
          <Cell text="Last" css={[sBold]} />
          <Cell text="Your last attempt" />
          <Cell text="WR" css={[sBold]} />
          <Cell text="World record" />
          <Cell text="PB" css={[sBold]} />
          <Cell text="Personal Best" />
          <Cell text="BPS" css={[sBold]} />
          <Cell text="Best Personal Splits - Look on all your attempts, and for each split it takes the best one." />
          <Cell text="FB" css={[sBold]} />
          <Cell text="Friend Best - Display the best attempt among your friends" />
          <Cell text="ΣS" css={[sBold]} />
          <Cell text="The sum of the splits" />
          <Cell text="ΔS" css={[sBold]} />
          <Cell text="The difference between two splits" />
          <Cell text="ΔΣS" css={[sBold]} />
          <Cell text="The difference between two sum of splits" />
        </GridColumn>
        <h4>Colors</h4>
        <p>
          For the <strong>Last</strong> row, the colors are inspired by F1
        </p>
        <ul>
          <li style="color: var(--mk-f1-purple)">Purple: The time is better than the WR</li>
          <li style="color: var(--mk-f1-green)">Green: The time is better than your BPS</li>
          <li>White: The time is better than your PB</li>
          <li style="color: var(--mk-f1-yellow)">Yellow: The time is worst than your PB</li>
        </ul>
        <p>For the other line, the colors and meaning is similar than Mario Kart World.</p>
      </details>

      <details>
        <summary>
          What is the <em>File</em> mode on the Live page?
        </summary>
        <p>
          The file mode allows you to use a recorded video to analyse and extract the information from it. You do not
          need to watch the video, you can just watch the key moment:
        </p>
        <ol>
          <li>You must watch the countdown</li>
          <li>Each time you cross the finish line</li>
        </ol>
      </details>

      <details>
        <summary>
          What does the <em>Shrink</em> action do on the History and Friends pages?
        </summary>
        <p>It cleans the data to keep only the relevant one.</p>
        <ul>
          <li>
            On the History page, it keeps all your best time records and the best split records; everything else is
            discarded.
          </li>
          <li>On the Friends page, it keeps only the best time records.</li>
        </ul>
      </details>

      <details>
        <summary>Why the number of tries does not correspond to the number of lines in History page?</summary>
        <p>
          The number of tries takes into account the discarded attempts from the <em>Shrink</em> action.
        </p>
      </details>

      <details>
        <summary>
          What does the <em>Add</em> action do on the page History and Friends?
        </summary>
        <p>
          It merges the input data with the current data and removes duplicates. The number of tries takes into account
          the discarded attempts from the <em>Shrink</em> action.
        </p>
        <p>For the History page, the number of tries is added so it could make the value obsolete.</p>
      </details>
    </>
  );
};
