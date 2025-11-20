import type { EnhancedImageData } from "../tools/image/enhanced-image-data";
import { createStore } from "solid-js/store";
import { getCoins } from "../resources/coin-digits";
import { getCurrentLap } from "../resources/lap-current-lap";
import { getMap } from "../resources/map";
import { getShrooms } from "../resources/shroom";
import { getTime } from "../resources/time-digits";
import { getTotalLaps } from "../resources/lap-total-lap";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
export function useResources() {
  const [state, setState] = createStore({
    time: "None",
    lap: {
      current: "None",
      total: "None",
    },
    shrooms: "None",
    coins: "None",
    map: "None",
  });

  const update = (image: EnhancedImageData, context?: CanvasRenderingContext2D): void => {
    setState({
      time: getTime(image, context),
      lap: {
        current: getCurrentLap(image, context),
        total: getTotalLaps(image, context),
      },
      shrooms: getShrooms(image, context),
      coins: getCoins(image, context),
      map: getMap(image, context),
    });
  };

  return {
    update,
    state,
  };
}
