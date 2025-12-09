import type { AttemptsStorage } from "../../core/domain/types/attempts-storage";
import type { Brand } from "../../core/helpers/brand";
import { createIndexedStore } from "./utils/create-indexed-store";
import { createMemo } from "solid-js";
import { createSingletonRoot } from "@solid-primitives/rootless";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useFriendsStorageSingleton() {
  const { store, setStore, restore, download } = createIndexedStore<AttemptsStorage>("friends-attempts", {
    version: 1,
    attempts: [],
  });
  const attempts = createMemo(() => store.attempts);

  return {
    store,
    setStore,
    attempts,
    restore,
    download,
  };
}

type FriendsStorage = Brand<ReturnType<typeof useFriendsStorageSingleton>>;
export const useFriendsStorage = createSingletonRoot<FriendsStorage>(useFriendsStorageSingleton);
