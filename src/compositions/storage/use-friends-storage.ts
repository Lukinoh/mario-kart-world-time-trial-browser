import { AttemptsStorageSchema } from "../../core/domain/types/attempts-storage";
import { AttemptsUtils } from "../../core/helpers/attempts-utils";
import type { Brand } from "../../core/helpers/brand";
import { createIndexedStore } from "./utils/create-indexed-store";
import { createMemo } from "solid-js";
import { createSingletonRoot } from "@solid-primitives/rootless";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useFriendsStorageSingleton() {
  const { store, setStore, restore, download } = createIndexedStore("friends-attempts", AttemptsStorageSchema, {
    version: 1,
    attempts: [],
  });
  const attempts = createMemo(() => store.attempts);
  const records = createMemo(() => AttemptsUtils.getRecords(store.attempts));

  return {
    store,
    setStore,
    attempts,
    restore,
    download,
    records,
  };
}

type FriendsStorage = Brand<ReturnType<typeof useFriendsStorageSingleton>>;
export const useFriendsStorage = createSingletonRoot<FriendsStorage>(useFriendsStorageSingleton);
