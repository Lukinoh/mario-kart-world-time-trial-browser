import type { Attempt } from "../../core/domain/types/attempt";
import { AttemptsStorageSchema } from "../../core/domain/types/attempts-storage";
import type { Brand } from "../../core/helpers/brand";
import { createIndexedStore } from "./utils/create-indexed-store";
import { createMemo } from "solid-js";
import { createSingletonRoot } from "@solid-primitives/rootless";
import { produce } from "solid-js/store";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function usePersonalStorageSingleton() {
  const { store, setStore, restore, download } = createIndexedStore("personal-attempts", AttemptsStorageSchema, {
    version: 1,
    attempts: [],
  });
  const attempts = createMemo(() => store.attempts);
  const lastAttempt = createMemo(() => store.attempts.at(0));

  const upsertAttempt = (newAttempt: Attempt): void => {
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
  };

  return {
    store,
    setStore,
    upsertAttempt,
    attempts,
    lastAttempt,
    restore,
    download,
  };
}

type PersonalStorage = Brand<ReturnType<typeof usePersonalStorageSingleton>>;
export const usePersonalStorage = createSingletonRoot<PersonalStorage>(usePersonalStorageSingleton);
