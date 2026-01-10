import type { Component } from "solid-js";
import { useSettingsRepository } from "../../database/compositions/use-settings-repository";

export const FeedbackCheckbox: Component = () => {
  const settings = useSettingsRepository();

  return (
    <div>
      <span>Display</span>
      <label>
        <input
          type="checkbox"
          checked={settings.isVideoVisible()}
          onChange={(event) => {
            settings.setVideoVisible(event.target.checked);
          }}
        />
        <span>Video</span>
      </label>
      <label>
        <input
          type="checkbox"
          checked={settings.isDebug()}
          onChange={(event) => {
            settings.setIsDebug(event.target.checked);
          }}
        />
        <span>Debug</span>
      </label>
    </div>
  );
};
