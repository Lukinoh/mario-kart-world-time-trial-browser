import { type ObsResponse, useObsBroadcastChannel } from "./use-obs-broadcast-channel";
import { createSignal, onMount } from "solid-js";
import type { Brand } from "../../_core/utils/brand";
import { createSingletonRoot } from "../../_core/utils/solid-js";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
export function useObsListenerSingleton() {
  const bc = useObsBroadcastChannel();
  const [data, setData] = createSignal<ObsResponse["data"]>();

  onMount(() => {
    bc.onMessage((message) => {
      if (message.type === "response") {
        setData(message.data);
      }
    });

    bc.sendMessage({
      type: "request",
    });
  });

  return {
    data: data,
  };
}

type ObsListenerSingleton = Brand<ReturnType<typeof useObsListenerSingleton>>;
export const useObsListener = createSingletonRoot<ObsListenerSingleton>(useObsListenerSingleton);
