import { A } from "@solidjs/router";
import type { Component } from "solid-js";
import { Mkwttb } from "../../domains/_core/components/mkwttb";

export const FaqSetup: Component = () => {
  return (
    <>
      <h3>Setup</h3>

      <details>
        <summary>Why do I have a popup asking for camera permission?</summary>
        <p>The permission is needed to access you card capture.</p>
      </details>

      <details>
        <summary>Why do I have a popup asking for persistent data storage permission?</summary>
        <p>
          All the data is stored inside the{" "}
          <A target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">
            IndexedDB
          </A>
          , and in some browsers you must allow the permission to use it.
        </p>
      </details>

      <details>
        <summary>How do I select a camera on Chrome/Edge?</summary>
        <p>
          You can select your camera by accessing the camera permissions settings of your browser. For Chrome-based
          browser, you can copy the following URL in your address bar.
        </p>
        <p>
          <code>chrome://settings/privacy/sitePermissions/allPermissions/camera</code>
        </p>
      </details>

      <details>
        <summary>
          Does <Mkwttb /> work in my browser's Incognito/Privacy mode?
        </summary>
        <p>
          <Mkwttb /> does not support using Incognito/Privacy mode. You may have bugs, or strange behaviours, especially
          in Safari and Firefox.
        </p>
      </details>
    </>
  );
};
