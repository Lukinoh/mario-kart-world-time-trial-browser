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

  const update = (image: EnhancedImageData, putImageData?: CanvasImageData["putImageData"]): void => {
    setState({
      time: getTime(image, putImageData),
      lap: {
        current: getCurrentLap(image, putImageData),
        total: getTotalLaps(image, putImageData),
      },
      shrooms: getShrooms(image, putImageData),
      coins: getCoins(image, putImageData),
      map: getMap(image, putImageData),
    });
  };

  return {
    update,
    state,
  };
}
