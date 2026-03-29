import type { Component } from "solid-js";

export const FaqKnownDetectionProblems: Component = () => {
  return (
    <>
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

      <details>
        <summary>During navigation in the menu of the Switch during the final split</summary>
        <p>
          If you go on the menu of the Switch during the <strong>final</strong> split, there is a small possibility to
          get a wrong split detection.
        </p>
      </details>
    </>
  );
};
