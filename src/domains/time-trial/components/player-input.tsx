import type { Component } from "solid-js";
import { TextInput } from "../../ui/components/text-input";
import { useSettingsRepository } from "../../database/compositions/use-settings-repository";

export const PlayerInput: Component = () => {
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
};
