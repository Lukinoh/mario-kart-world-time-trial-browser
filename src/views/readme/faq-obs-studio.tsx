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
          accessed by one application. The workaround is to configure an{" "}
          <A target="_blank" href="https://obsproject.com/kb/virtual-camera-guide">
            OBS Virtual Camera
          </A>{" "}
          that mirrors your capture card. Then you use the OBS Virtual Camera as a source in your browser.
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
          of number of splits. Do not forget to crop the header of the window 😊.
        </p>
        <p>
          After the first configuration, every time you open again the popup, OBS Studio should capture it
          automatically.
        </p>
      </details>
    </>
  );
};
