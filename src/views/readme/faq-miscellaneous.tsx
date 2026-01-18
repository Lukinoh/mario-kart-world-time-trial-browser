import type { Component } from "solid-js";

export const FaqMiscellaneous: Component = () => {
  return (
    <>
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
