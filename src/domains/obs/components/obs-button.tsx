import type { Component } from "solid-js";
import { OBS_POPUP_TARGET } from "../constants";
import { SymbolTextButton } from "../../ui/components/buttons/symbol-text-button";
import { useObsPopupProperties } from "../compositions/use-obs-popup-properties";
import { useRouter } from "../../_core/compositions/use-router";

export const ObsButton: Component = () => {
  const { getUrl } = useRouter();
  const { defineRatioCalculation, getResizeToSize, getMoveToPosition, getFeatures, setProperties } =
    useObsPopupProperties();

  // oxlint-disable-next-line no-null
  let popup: WindowProxy | null = null;

  const openPopup = (): void => {
    // If you click several times on the ObsButton, the opened window would not have the event listeners attached if we did not
    // close the precedent one first.
    popup?.close();

    // Technically, the features are not needed (except popup).
    // They are just there to reduce visuals when calling resizeTo and moveTo
    popup = window.open(getUrl("obs"), OBS_POPUP_TARGET, getFeatures());

    // When the application is running in offline mode (aka protocol file://):
    // Chrome cannot call popup methods (resizeTo, etc.), because of an origin mismatch error.
    // Safari cannot call popup methods (resizeTo, etc.), because of an origin mismatch error.
    // Firefox can call the methods.
    // A workaround could be possible if it was the popup itself to resize/moveTo instead of controlling it from here.

    // From here, we have strong behaviour differences between Safari, Firefox, and Chrome related to ZOOM.
    // - devicePixelRatio is always 1 on Safari, so there is a custom function to calculate it (works only on Safari)
    // - outerHeight and outerWidth in Firefox are affected by zoom, but not on Chrome and Safari
    // - resizeTo uses "real" pixels in Firefox and Chrome, but Safari needs to take into account the devicePixelRatio
    // - moveTo uses a different ratio depending on the browser, as all behave differently
    // - setProperties uses the same ratio as moveTo

    // Resize the popup to the expected size
    popup?.resizeTo(...getResizeToSize());

    // Determine the ratio for moveTo and setProperties.
    defineRatioCalculation(popup);

    // The call window.open is async, so in Firefox, if we attach the "resize" event listener too early, it would not work.
    // So, we have to wait for the "DOMContentLoaded" event. Chrome and Safari does not have this limitation.
    popup?.addEventListener("DOMContentLoaded", () => {
      // The moveTo calls is inside the DOMContentLoaded, because in Firefox, if we call the moveTo too early
      // the popup positioning is randomly incorrect.
      popup?.moveTo(...getMoveToPosition());

      const updateObsPopup = (): void => {
        if (popup) {
          setProperties(popup);
        }
      };

      popup?.addEventListener("resize", updateObsPopup);
      popup?.addEventListener("beforeunload", updateObsPopup);
    });
  };

  return (
    <SymbolTextButton symbol="🢅" onClick={openPopup}>
      OBS
    </SymbolTextButton>
  );
};
