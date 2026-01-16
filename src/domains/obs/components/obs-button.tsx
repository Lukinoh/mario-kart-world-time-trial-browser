import type { Component } from "solid-js";
import { OBS_POPUP_TARGET } from "../constants";
import { SymbolButton } from "../../ui/components/symbol-button";
import { useDevicePixelRatio } from "../compositions/use-device-pixel-ratio";
import { useRouter } from "../../_core/compositions/use-router";
import { useSettingsRepository } from "../../database/compositions/use-settings-repository";

export const ObsButton: Component = () => {
  const settings = useSettingsRepository();
  const { getUrl } = useRouter();
  const { getRatio, defineRatioCalculation } = useDevicePixelRatio();

  // oxlint-disable-next-line no-null
  let win: WindowProxy | null = null;

  const openPopup = (): void => {
    const features = [
      "popup",
      // Technically, these features are not needed, it is just to reduce the effect of the resizeTo called later
      `left=0`,
      `top=0`,
      `width=${settings.obsPopup().width}`,
      `height=${settings.obsPopup().height}`,
    ];
    // Needed to avoid some strange behaviour when you click on the OBS button while the OBS Popup is already open.
    // Concretely, the "new" window would not have the event listener attached to its window.
    // We need to close the window if it is already open, otherwise, the next window.open won't have any event listener working.
    // 1° Open OBS popup => Change size event is triggered
    // 2° Open OBS popup => Change size event is not triggered
    win?.close();

    win = window.open(getUrl("obs"), OBS_POPUP_TARGET, features.join(","));

    // Lots of hacks to handle the zooming, because on Firefox and Chrome you have access to the devicePixelRatio, but not on Safari.
    // Then, the outerHeight and outerWidth is not calculated the same for Firefox, and Chrome (and by extension Safari).
    // For Firefox, we have to apply the devicePixelRatio, whereas for Chrome no.
    // And for Safari, we also have to apply a ratio, but it is calculated using the function getSafariDevicePixelRatio
    // because the devicePixelRatio always returns 1 in any situation.

    win?.resizeTo(settings.obsPopup().width, settings.obsPopup().height);

    // Once, the popup is open, we can determine if we have to apply some ratio to the outerHeight/outerWidth, before
    // saving the value.
    // Firefox, Chrome, and Safari behave differently.
    defineRatioCalculation(win, settings.obsPopup());

    // The call window.open is async, so on Firefox, if we call the addEventListener too early to attach the "resize", it would not work.
    // So, we have to wait on the "load" event. On Chrome, it is not necessary, and on Safari ¯\_(ツ)_/¯
    win?.addEventListener("load", () => {
      win?.addEventListener("resize", () => {
        if (win) {
          const ratio = getRatio();
          settings.setObsPopup({
            height: win.outerHeight * ratio,
            width: win.outerWidth * ratio,
          });
        }
      });
    });
  };

  return (
    <SymbolButton symbol="🢅" onClick={openPopup}>
      OBS
    </SymbolButton>
  );
};
