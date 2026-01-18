import type { Component } from "solid-js";
import { Mkwttb } from "../../domains/_core/components/mkwttb";

export const FaqSourceFile: Component = () => {
  return (
    <>
      <h3>Source File</h3>

      <details>
        <summary>
          What is the source <em>File</em>?
        </summary>
        <p>
          The source <em>File</em> allows you to use a recorded video to extract the time trial information from it. You
          do not need to watch all the video to extract the information; you just need to watch the key moment:
        </p>
        <ol>
          <li>You must watch the countdown</li>
          <li>Each time you cross the finish line</li>
        </ol>
        <p>Alternatively, you can also increase the playback rate.</p>
      </details>

      <details>
        <summary>Why is my video not analysed correctly when I set a high playback rate (speed)?</summary>
        <p>
          The analysis capacity at a high playback rate is affected by your CPU, your operating system, your browser,
          and the codec of the video. So, depending on these factors, a very high playback rate may not work as
          expected. You must find the playback rate that works best for your setup. Usually, x8 is a safe value.
        </p>
      </details>

      <details>
        <summary>Why the video I selected cannot be played?</summary>
        <p>
          <Mkwttb /> supports only codecs that are supported by the browser natively (HTML5 video).
        </p>
      </details>
    </>
  );
};
