import type { AttemptStorage } from "../../core/domain/types/attempt-storage";
import type { AttemptsStorage } from "../../core/domain/types/attempts-storage";
import type { Brand } from "../../core/helpers/brand";
import { JSONUtils } from "../../core/helpers/json-utils";
import { PersonalStorageSchema } from "../../core/domain/types/personal-storage";
import { createIndexedStore } from "./utils/create-indexed-store";
import { createMemo } from "solid-js";
import { createSingletonRoot } from "../../core/helpers/solid-js";
import { produce } from "solid-js/store";
import { useAttempts } from "../utils/use-attempts";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function usePersonalStorageSingleton() {
  const { key, store, setStore, restore, download } = createIndexedStore("personal-attempts", PersonalStorageSchema, {
    version: 1,
    attempts: [],
    attemptsNumber: 0,
    player: "",
  });
  const { attempts, lastAttempt, getFlattenRecords, getTimeRecords } = useAttempts(store);

  const upsertAttempt = (newAttempt: AttemptStorage): void => {
    const index = attempts().findIndex((attempt) => attempt.timestamp === newAttempt.timestamp);

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

  const player = createMemo(() => store.player);
  const setPlayer = (player: string): void => {
    setStore("player", player);
  };
  const attemptsNumber = createMemo(() => store.attemptsNumber);

  const downloadForFriends = (): void => {
    JSONUtils.download<AttemptsStorage>(`${key}-for-friends`, {
      version: store.version,
      attempts: getTimeRecords(),
    });
  };

  const clean = (): void => {
    const flattenRecords = getFlattenRecords();
    setStore(
      produce((store) => {
        store.attempts = flattenRecords;
      }),
    );
  };

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
    downloadForFriends,
    clean,
  };
}

type PersonalStorage = Brand<ReturnType<typeof usePersonalStorageSingleton>>;
export const usePersonalStorage = createSingletonRoot<PersonalStorage>(usePersonalStorageSingleton);
