import { TextInput } from "../../ui/components/text-input";
import { defineComponent } from "../../_core/utils/solid-js";
import { useSettingsRepository } from "../../database/compositions/use-settings-repository";

export const PlayerInput = defineComponent(() => {
  const settings = useSettingsRepository();

  return (
    <TextInput
      label="Player"
      placeholder="Set your name"
      value={settings.player()}
      onInput={(name) => {
        settings.setPlayer(name);
      }}
    />
  );
});
