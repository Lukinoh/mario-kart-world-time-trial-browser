import { createEffect, onMount } from "solid-js";
import type { Attempt } from "../../attempt/schemas/attempt";
import { OBS_POPUP_TARGET } from "../constants";
import type { ReferenceRecords } from "../../attempt/types/reference-records";
import { useBroadcastChannel } from "../../_core/compositions/use-broadcast-channel";
import { usePersonalRepository } from "../../database/compositions/use-personal-repository";
import { useRepositories } from "../../database/compositions/use-repositories";

interface ObsRequest {
  type: "request";
}

export interface ObsResponse {
  type: "response";
  data?: {
    last: Attempt;
    references: ReferenceRecords;
  };
}

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
export function useObs() {
  const bc = useBroadcastChannel<ObsRequest | ObsResponse>("obs-channel");
  const personal = usePersonalRepository();
  const repositories = useRepositories();

  onMount(() => {
    bc.onMessage((message) => {
      if (message.type === "request") {
        sendResponse();
      }
    });
  });

  createEffect(() => {
    sendResponse();
  });

  const sendResponse = (): void => {
    const response: ObsResponse = {
      type: "response",
    };

    const last = personal.lastAttempt();
    if (last) {
      response.data = {
        last: last,
        references: repositories.getReferenceRecords(last.raw.track),
      };
    }

    bc.sendMessage(response);
  };

  const sendRequest = (): void => {
    bc.sendMessage({
      type: "request",
    });
  };

  const openPopup = (): void => {
    const url = new URL(import.meta.env.BASE_URL, location.href);
    window.open(url, OBS_POPUP_TARGET, "popup");
  };

  return {
    sendRequest,
    onMessage: bc.onMessage,
    openPopup,
  };
}
