import { type ObsResponse, useObsBroadcastChannel } from "./use-obs-broadcast-channel";
import { createEffect, onMount } from "solid-js";
import { createSingletonRoot } from "../../_core/utils/solid-js";
import { usePersonalRepository } from "../../database/compositions/use-personal-repository";
import { useRepositories } from "../../database/compositions/use-repositories";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function setupObsEmitterSingleton() {
  const bc = useObsBroadcastChannel();
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
}

export const setupObsEmitter = createSingletonRoot(setupObsEmitterSingleton);
