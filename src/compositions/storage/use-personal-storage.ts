import type { Attempt } from "../../core/domain/types/attempt";
import type { Brand } from "../../core/helpers/brand";
import { PersonalStorageSchema } from "../../core/domain/types/personal-storage";
import { createIndexedStore } from "./utils/create-indexed-store";
import { createMemo } from "solid-js";
import { createSingletonRoot } from "@solid-primitives/rootless";
import { produce } from "solid-js/store";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function usePersonalStorageSingleton() {
  const { store, setStore, restore, download } = createIndexedStore("personal-attempts", PersonalStorageSchema, {
    version: 1,
    attempts: [],
    attemptsNumber: 0,
    player: "Noname",
  });

  const upsertAttempt = (newAttempt: Attempt): void => {
    const index = store.attempts.findIndex((attempt) => attempt.timestamp === newAttempt.timestamp);

    setStore(
      produce((store) => {
        if (index === -1) {
          store.attemptsNumber = store.attemptsNumber + 1;
          store.attempts.unshift(newAttempt);
        } else {
          store.attempts[index] = newAttempt;
        }
      }),
    );
  };

  const attempts = createMemo(() => store.attempts);
  const lastAttempt = createMemo(() => store.attempts.at(0));
  const player = createMemo(() => store.player);
  const setPlayer = (player: string): void => {
    setStore("player", player);
  };
  const attemptsNumber = createMemo(() => store.attemptsNumber);

  return {
    store,
    setStore,
    upsertAttempt,
    attempts,
    lastAttempt,
    player,
    setPlayer,
    attemptsNumber,
    restore,
    download,
  };
}

type PersonalStorage = Brand<ReturnType<typeof usePersonalStorageSingleton>>;
export const usePersonalStorage = createSingletonRoot<PersonalStorage>(usePersonalStorageSingleton);
