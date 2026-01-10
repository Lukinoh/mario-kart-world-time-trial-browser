import { SymbolButton } from "../../ui/components/symbol-button";
import { defineComponent } from "../../_core/utils/solid-js";
import { useObs } from "../compositions/use-obs";

export const ObsButton = defineComponent(() => {
  const obs = useObs();

  return (
    <SymbolButton symbol="🢅" onClick={obs.openPopup}>
      OBS
    </SymbolButton>
  );
});
