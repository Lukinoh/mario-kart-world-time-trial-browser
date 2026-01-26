import { A } from "@solidjs/router";
import type { Component } from "solid-js";
import { Mkwttb } from "../../domains/_core/components/mkwttb";
import { WORLD_RECORD_URL } from "../../domains/_core/constants/external-urls";

export const FaqMiscellaneous: Component = () => {
  return (
    <>
      <h3>Miscellaneous</h3>

      <details>
        <summary>What is the difference with Mario Kart World Toolkit?</summary>
        <p>
          Mario Kart World Toolkit is a desktop application (Rust/Tauri) that needs to be installed on your computer. It
          uses machine learning for data extraction, making it more CPU-intensive. Unfortunately, the project is no
          longer maintained, functioning more as a prototype than a fully-fledged application. For instance, when you
          change track in the game, you have to change track in the application. Moreover, if you beat your record, you
          have to manually update the value in the application.
        </p>

        <p>
          <Mkwttb /> is a web application that runs in your browser. It uses image comparison for data extraction, and
          it is less CPU intensive. It provides a lot more features, with one of its goals being "capture and forget".
          It automatically identifies tracks you are playing on and updates your records.
        </p>
      </details>

      <details>
        <summary>What is CodeTabs?</summary>
        <p>
          <A target="_blank" href="https://codetabs.com/">
            CodeTabs
          </A>{" "}
          provides a cors proxy. It allows you to retrieve data from{" "}
          <A target="_blank" href={WORLD_RECORD_URL}>
            mkwrs.com
          </A>
          . Without, it would not be possible due to technical limitations.
        </p>
      </details>

      <details>
        <summary>Why the OBS icon looks strange on MacOS?</summary>
        <p>
          Sorry <code>¯\_(ツ)_/¯</code>
        </p>
      </details>
    </>
  );
};
