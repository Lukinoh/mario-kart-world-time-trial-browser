import { For, createSelector } from "solid-js";
import { defineComponent } from "../../_core/utils/solid-js";
import { getAvailablePlaybackRates } from "../utils/get-playbackrate-rates";
import { targetFromEvent } from "../../_core/utils/event";
import { useSettingsRepository } from "../../database/compositions/use-settings-repository";

export const PlaybackRateSelect = defineComponent(() => {
  const settings = useSettingsRepository();
  const rates = getAvailablePlaybackRates();
  const isSelected = createSelector(settings.playbackRate);

  const onSelected = (event: Event): void => {
    const target = targetFromEvent(event, HTMLSelectElement);
    settings.setPlaybackRate(Number(target.value));
  };

  return (
    <div>
      <label>Speed</label>
      <select onchange={onSelected}>
        <For each={rates}>
          {(rate) => (
            <option value={rate} selected={isSelected(rate)}>
              x{rate}
            </option>
          )}
        </For>
      </select>
    </div>
  );
});
