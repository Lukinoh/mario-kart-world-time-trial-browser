import type { Component } from "solid-js";
import { OBS_POPUP_TARGET } from "../constants";
import { SymbolButton } from "../../ui/components/symbol-button";
import { useRouter } from "../../_core/compositions/use-router";

export const ObsButton: Component = () => {
  const { getUrl } = useRouter();
  const openPopup = (): void => {
    window.open(getUrl("obs"), OBS_POPUP_TARGET, "popup");
  };

  return (
    <SymbolButton symbol="🢅" onClick={openPopup}>
      OBS
    </SymbolButton>
  );
};
