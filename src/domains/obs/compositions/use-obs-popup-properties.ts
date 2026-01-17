import { getSafariDevicePixelRatio, isSafari } from "../../_core/utils/safari-utils";
import type { Brand } from "../../_core/utils/brand";
import { useSettingsRepository } from "../../database/compositions/use-settings-repository";

type RatioMode = "safari-ratio" | "ratio" | "no-ratio";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useObsPopupPropertiesFactory() {
  const settings = useSettingsRepository();
  let ratioMode: RatioMode | undefined = undefined;

  const getFeatures = (): string => {
    return [
      "popup",
      `top=${settings.obsPopup().top}`,
      `left=${settings.obsPopup().left}`,
      `width=${settings.obsPopup().width}`,
      `height=${settings.obsPopup().height}`,
    ].join(",");
  };

  const getResizeToSize = (): [width: number, height: number] => {
    return [settings.obsPopup().width / getResizeToRatio(), settings.obsPopup().height / getResizeToRatio()];
  };

  const getMoveToPosition = (): [x: number, y: number] => {
    return [settings.obsPopup().left / getMoveToRatio(), settings.obsPopup().top / getMoveToRatio()];
  };

  const setProperties = (win: WindowProxy): void => {
    const ratio = getMoveToRatio();

    settings.setObsPopup({
      height: win.outerHeight * ratio,
      width: win.outerWidth * ratio,
      top: win.screenTop * ratio,
      left: win.screenLeft * ratio,
    });
  };

  /*
    Specific logic for Firefox, Chrome, Safari...
    See obs-button.tsx for more insights.
   */

  // Once we open popup, if we are not in Safari, we compare its outerHeight and outerWidth with the expected one.
  // If they are not the same, it means we need a ratio, otherwise, we do not it.
  const defineRatioCalculation = (win: WindowProxy | null): RatioMode => {
    if (isSafari()) {
      ratioMode = "safari-ratio";
    } else if (win?.outerHeight !== settings.obsPopup().height && win?.outerWidth !== settings.obsPopup().width) {
      ratioMode = "ratio";
    } else {
      ratioMode = "no-ratio";
    }

    return ratioMode;
  };

  // moveTo function needs a specific ratio depending on the browser.
  const getMoveToRatio = (): number => {
    if (ratioMode === "ratio") {
      return window.devicePixelRatio;
    } else if (ratioMode === "safari-ratio") {
      return getSafariDevicePixelRatio();
    }
    return 1;
  };

  // resizeTo function needs a specific ratio depending on the browser.
  const getResizeToRatio = (): number => {
    if (isSafari()) {
      return getSafariDevicePixelRatio();
    }
    return 1;
  };

  return {
    defineRatioCalculation,
    setProperties,
    getFeatures,
    getResizeToSize,
    getMoveToPosition,
  };
}

type ObsPopupProperties = Brand<ReturnType<typeof useObsPopupPropertiesFactory>>;
type ObsPopupPropertiesFactory = (...args: Parameters<typeof useObsPopupPropertiesFactory>) => ObsPopupProperties;
export const useObsPopupProperties: ObsPopupPropertiesFactory = useObsPopupPropertiesFactory;
