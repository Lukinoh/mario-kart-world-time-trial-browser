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

      <details>
        <summary>I have a black frame around the image, and the application does not work. What should I do?</summary>
        <p>
          It means you have <em>overscan</em>, and to fix it you configured the <code>Adjust Screen Size</code> to a
          value smaller than 100% in your{" "}
          <A
            target="_blank"
            href="https://www.nintendo.com/au/support/articles/how-to-adjust-the-display-settings-on-nintendo-switch-2/"
          >
            Switch settings
          </A>
        </p>
        <p>
          Usually, the overscan issue should be fixed directly on your TV. So, set the value back to do 100%. Then,
          depending on your TV Brand try the following instructions. If you TV is not listed, please refer to the manual
          of your TV.
        </p>
        <ul>
          {/*Source: https://askubuntu.com/questions/4358/how-do-i-fix-overscan-on-my-hdmi-hdtv*/}
          <li>
            <strong>Samsung TV -</strong> Go to Menu / Picture / Picture Options / Size / Screen Fit (instead of 16:9).
          </li>
          <li>
            <strong>LG TV -</strong> Go to Settings / Picture / Aspect Ratio / Just Scan (instead of 16:9)
          </li>
          <li>
            <strong>Sony TV -</strong> Hit Home button, go to Settings / Screen / Display Area / Full Pixel
          </li>
          <li>
            <strong>Sharp TV -</strong> Hit View Mode button, select "Dot by Dot" or "Full screen"
          </li>
        </ul>
      </details>
    </>
  );
};
