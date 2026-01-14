import { type Component, onMount } from "solid-js";
import { A } from "@solidjs/router";
import { Cell } from "../domains/ui/components/grid/cell";
import { GridColumn } from "../domains/ui/components/grid/grid-column";
import { ValibotImportButton } from "../domains/database/components/valibot-import-button/valibot-import-button";
import type { ViewProps } from "../domains/_core/utils/solid-js";
import { cellCss } from "../domains/ui/css/cell-css";
import logo from "../assets/icons/original-no-background-stylized.png";
import { useRepositories } from "../domains/database/compositions/use-repositories";

const sBold = cellCss({
  bold: true,
});

export const Readme: Component<ViewProps> = (props) => {
  const repositories = useRepositories();

  onMount(() => {
    props.setTitle("Readme 🥺");
  });

  return (
    <>
      <aside>
        <img alt="logo" src={logo} />
      </aside>
      <p>
        This project is inspired by an idea of{" "}
        <A target="_blank" href="https://github.com/breadbored/">
          @breadbored
        </A>{" "}
        and its project{" "}
        <A target="_blank" href="https://bread.codes/posts/mario-kart-world-toolkit/">
          Mario Kart World Toolkit
        </A>
        . So I would like to thank him for having opened the path.
      </p>
      <p>
        The concept of this project resolves around two elements. Firstly, the extraction of data from the time trial is
        done using simple image comparisons. Secondly, everything is stored in your browser.
      </p>
      <p>You must have a capture card to use this application that captures video at least at 720p.</p>
      <p>The project is quite big, and I do not plan to add new features.</p>
      <p>
        If you find any bugs, you can try to open an issue{" "}
        <A href="https://github.com/Lukinoh/mario-kart-world-time-trial-browser/issues/new/choose">here</A>.
      </p>

      <h2>FAQ</h2>

      <h3>Setup</h3>

      <details>
        <summary>How do I select a camera on Chrome/Edge?</summary>
        <p>
          You can select your camera by accessing the camera permissions of your browser by coping the following URL in
          your address bar.
        </p>
        <ul>
          <li>edge://settings/privacy/sitePermissions/allPermissions/camera</li>
          <li>chrome://settings/privacy/sitePermissions/allPermissions/camera</li>
        </ul>
      </details>

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

      <h3>Known detection problems</h3>

      <details>
        <summary>During the countdown</summary>
        <p>If you do pause during the countdown, you may get two attempts. Avoid doing pause during the countdown.</p>
      </details>

      <details>
        <summary>During a notification</summary>
        <p>
          If you pass the finish line, and there is the notification that arrives at the same time, the detection of the
          number of shrooms could be wrong, as the shrooms are partially hidden by the notification.
        </p>
      </details>

      <h3>Data</h3>

      <details>
        <summary>How data is stored?</summary>
        <p>
          The data is exclusively stored in your browser using IndexedDB. In some browsers, you may be asked to allow
          persistent storage.
        </p>
      </details>
      <details>
        <summary>How can I backup all my data?</summary>
        <button onClick={repositories.download}>Export</button>
      </details>
      <details>
        <summary>How can I restore all my data?</summary>
        <ValibotImportButton onClick={repositories.restore}>Import</ValibotImportButton>
      </details>
      <details>
        <summary>How can I import my current records?</summary>
        <p>The simplest way is to play your ghosts. It will take some time, but it works.</p>
        <p>
          Alternatively, you could modify the database manually by exporting your history and adding the necessary
          values manually. This is more technical, and implies the fact that you already know your splits (time,
          shrooms, and coins).
        </p>
      </details>

      <h3>Miscellaneous</h3>

      <details>
        <summary>What is codetabs.com?</summary>
        <p>
          codetabs.com provides a cors proxy. It allows you to retrieve data from mkwrs.com. Without, it would not be
          possible to have the automatic updates of the world records.
        </p>
      </details>
    </>
  );
};
