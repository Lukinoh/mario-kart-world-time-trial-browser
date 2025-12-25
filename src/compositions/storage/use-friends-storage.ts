import { AttemptsStorageSchema } from "../../core/domain/types/attempts-storage";
import type { Brand } from "../../core/helpers/brand";
import { createIndexedStore } from "./utils/create-indexed-store";
import { createSingletonRoot } from "@solid-primitives/rootless";
import { useAttempts } from "../utils/use-attempts";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useFriendsStorageSingleton() {
  const { store, setStore, restore, download } = createIndexedStore("friends-attempts", AttemptsStorageSchema, {
    version: 1,
    attempts: [],
  });

  const { attempts } = useAttempts(store);

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
