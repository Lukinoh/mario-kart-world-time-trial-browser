import { A } from "@solidjs/router";
import type { Component } from "solid-js";
import { Mkwttb } from "../../domains/_core/components/mkwttb";

export const FaqObsStudio: Component = () => {
  return (
    <>
      <h3>OBS Studio</h3>

      <details>
        <summary>
          How can I use <Mkwttb /> with OBS Studio running?
        </summary>
        <p>
          Most probably, you cannot use both applications at the same time, because the card capture can only be
          accessed by one application.
        </p>
        <p>
          If you have Windows 11 24H2 or later, it is possible to share your capture card. Just follow the{" "}
          <A
            target="_blank"
            href="https://www.elevenforum.com/t/enable-or-disable-multiple-apps-to-use-camera-in-windows-11.31199"
          >
            following instructions
          </A>
          .
        </p>
        <p>
          Otherwise, you can configure an{" "}
          <A target="_blank" href="https://obsproject.com/kb/virtual-camera-guide">
            OBS Virtual Camera
          </A>{" "}
          that mirrors your capture card. In its settings, select <code>Source</code> as <code>Output Type</code>, and
          your Switch source as <code>Output Selection</code>. Then, after starting it, in your browser, select OBS
          Virtual Camera as a webcam.
        </p>
      </details>

      <details>
        <summary>
          How can I integrate <Mkwttb /> with OBS Studio?
        </summary>
        <p>
          By clicking on the OBS button, it will open a view specifically developed for OBS. You may have to allow
          popups to make it appear.
        </p>
        <p>
          On OBS Studio, add a new source <code>Window Capture</code>, and you select the popup. When you configure it
          for the first time, I suggest that you go on the track DK Spaceport as it is the worst-case scenario in terms
          of height due to its high number of splits. Do not forget to crop the header of the window 😊.
        </p>
        <p>
          After the first configuration, every time you open again the popup, OBS Studio should capture it
          automatically.
        </p>
        <p>Additionally, you can make the background of the OBS popup transparent by adding a filter.</p>
        <ol>
          <li>
            Click right on your <code>Window Capture</code> source
          </li>
          <li>
            Click on <code>Filters</code>
          </li>
          <li>
            Add a new <code>Effect Filters</code> of type <code>Color Key</code>
          </li>
          <li>
            Set <code>Key Color Type</code> to <code>Custom Color</code>
          </li>
          <li>
            Set <code>Key Color</code> to <code>#212121</code>
          </li>
          <li>Adjust the additional settings if necessary</li>
        </ol>
      </details>
    </>
  );
};
