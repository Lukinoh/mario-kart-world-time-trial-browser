import { createMemo, onMount } from "solid-js";
import { createStore, produce, unwrap } from "solid-js/store";
import type { Attempt } from "../../core/types/attempt";
import type { AttemptsStorage } from "./attempts-storage";
import { newQueue } from "@henrygd/queue";
import { useIndexedDatabaseValue } from "../utils/use-indexed-key-val";

const queue = newQueue(1);
const database = useIndexedDatabaseValue<AttemptsStorage>("attempts");
const [store, setStore] = createStore<AttemptsStorage>({
  version: 1,
  attempts: [],
});

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
export function useStorage() {
  const attempts = createMemo(() => store.attempts);
  const lastAttempt = createMemo(() => store.attempts.at(0));

  onMount(async () => {
    const persistent = await navigator.storage.persist();
    if (persistent) {
      console.info("Storage will not be cleared except by explicit user action.");
    } else {
      console.warn("Storage may be cleared by the UA under storage pressure.");
    }

    setStore((await database.get()) ?? store);
  });

  const createOrUpdateAttempt = (newAttempt: Attempt): void => {
    const index = store.attempts.findIndex((attempt) => attempt.timestamp === newAttempt.timestamp);

    setStore(
      produce((store) => {
        if (index === -1) {
          store.attempts.unshift(newAttempt);
        } else {
          store.attempts[index] = newAttempt;
        }
      }),
    );

    // oxlint-disable-next-line no-floating-promises
    queue.add(() => database.set(unwrap(store)));
  };

  return {
    createOrUpdateAttempt,
    attempts,
    lastAttempt,
  };
}
