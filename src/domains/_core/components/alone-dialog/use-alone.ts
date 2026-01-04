import { createSignal, onMount } from "solid-js";
import type { Brand } from "../../utils/brand";
import { createSingletonRoot } from "../../utils/solid-js";
import { useBroadcastChannel } from "../../compositions/use-broadcast-channel";

type Initiator = ReturnType<typeof crypto.randomUUID>;

interface Question {
  type: "question";
  initiator: Initiator;
}

interface Answer {
  type: "answer";
  initiator: Initiator;
}

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useAloneSingleton() {
  const bc = useBroadcastChannel<Question | Answer>("am-i-alone-channel");
  const [alone, setAlone] = createSignal(true);
  const tabId = crypto.randomUUID();

  onMount(() => {
    console.info(`This tab identifier is: ${tabId}`);

    bc.onMessage((data) => {
      if (data.type === "question") {
        bc.sendMessage({
          type: "answer",
          initiator: data.initiator,
        });
      } else if (data.type === "answer" && data.initiator === tabId) {
        setAlone(false);
      }
    });

    bc.sendMessage({
      type: "question",
      initiator: tabId,
    });
  });

  return {
    alone,
  };
}

type Alone = Brand<ReturnType<typeof useAloneSingleton>>;
export const useAlone = createSingletonRoot<Alone>(useAloneSingleton);
