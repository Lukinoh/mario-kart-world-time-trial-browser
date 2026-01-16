import { getSafariDevicePixelRatio, isSafari } from "../../_core/utils/safari-utils";
import type { Brand } from "../../_core/utils/brand";
import type { ObsEntity } from "../../database/schemas/obs-entity";

type RatioMode = "safari-ratio" | "ratio" | "no-ratio";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useDevicePixelRatioFactory() {
  let ratioMode: RatioMode | undefined = undefined;

  const defineRatioCalculation = (win: WindowProxy | null, obsPopup: ObsEntity["popup"]): RatioMode => {
    if (isSafari()) {
      ratioMode = "safari-ratio";
    } else if (win?.outerHeight !== obsPopup.height && win?.outerWidth !== obsPopup.width) {
      // Thanks to win and obsPopup, we can determine if we are on firefox...
      ratioMode = "ratio";
    } else {
      ratioMode = "no-ratio";
    }

    return ratioMode;
  };

  const getRatio = (): number => {
    if (ratioMode === "ratio") {
      return window.devicePixelRatio;
    } else if (ratioMode === "safari-ratio") {
      return getSafariDevicePixelRatio();
    }
    return 1;
  };

  return {
    defineRatioCalculation,
    getRatio,
  };
}

type DevicePixelRatio = Brand<ReturnType<typeof useDevicePixelRatioFactory>>;
type DevicePixelRatioFactory = (...args: Parameters<typeof useDevicePixelRatioFactory>) => DevicePixelRatio;
export const useDevicePixelRatio: DevicePixelRatioFactory = useDevicePixelRatioFactory;
