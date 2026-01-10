import type { Component } from "solid-js";
import { SymbolButton } from "../../ui/components/symbol-button";
import { useObs } from "../compositions/use-obs";

export const ObsButton: Component = () => {
  const obs = useObs();

  return (
    <SymbolButton symbol="🢅" onClick={obs.openPopup}>
      OBS
    </SymbolButton>
  );
};
