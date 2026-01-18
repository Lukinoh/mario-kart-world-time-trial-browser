import { A } from "@solidjs/router";
import type { Component } from "solid-js";
import { WORLD_RECORD_URL } from "../../domains/_core/constants/external-urls";

export const FaqMiscellaneous: Component = () => {
  return (
    <>
      <h3>Miscellaneous</h3>

      <details>
        <summary>What is CodeTabs?</summary>
        <p>
          <A href="https://codetabs.com/">CodeTabs</A> provides a cors proxy. It allows you to retrieve data from{" "}
          <A href={WORLD_RECORD_URL}>mkwrs.com</A>. Without, it would not be possible due to technical limitations.
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
