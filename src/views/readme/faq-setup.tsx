import type { Component } from "solid-js";

export const FaqSetup: Component = () => {
  return (
    <>
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
    </>
  );
};
