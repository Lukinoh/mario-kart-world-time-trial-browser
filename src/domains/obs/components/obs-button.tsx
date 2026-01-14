import type { Component } from "solid-js";
import { OBS_POPUP_TARGET } from "../constants";
import { SymbolButton } from "../../ui/components/symbol-button";

export const ObsButton: Component = () => {
  const openPopup = (): void => {
    const url = new URL(`${import.meta.env.BASE_URL}obs`, location.href);
    window.open(url, OBS_POPUP_TARGET, "popup");
  };

  return (
    <SymbolButton symbol="🢅" onClick={openPopup}>
      OBS
    </SymbolButton>
  );
};
