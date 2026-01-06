import * as v from "valibot";
import { AttemptsStorageSchema } from "../schemas/attempts-storage";
import type { Brand } from "../../_core/utils/brand";
import { JSONUtils } from "../../_core/utils/json-utils";
import { createSingletonRootAsync } from "../../_core/utils/solid-js";
import { produce } from "solid-js/store";
import { useAttempts } from "../../attempt/compositions/use-attempts";
import { useIndexedStore } from "./indexed/use-indexed-store";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useFriendsStorageSingleton() {
  const { store, setStore, exportToJSON, replaceFromJSON, isMounted } = useIndexedStore(
    "friends-attempts",
    AttemptsStorageSchema,
    {
      version: 1,
      attempts: [],
    },
  );

  const { attempts, getTimeRecordsByTrack, getFlattenRecords, merge } = useAttempts(store);

  const addFromJSON = async (): Promise<void> => {
    const text = await JSONUtils.upload();
    const data = v.parse(AttemptsStorageSchema, JSON.parse(text));
    setStore(
      produce((store) => {
        store.attempts = merge(data.attempts);
      }),
    );
  };

  const shrink = (): void => {
    const flattenRecords = getFlattenRecords();
    setStore(
      produce((store) => {
        store.attempts = flattenRecords;
      }),
    );
  };

  return {
    isMounted,
    store,
    setStore,
    attempts,
    getTimeRecordsByTrack,
    shrink,

    // JSON
    addFromJSON,
    replaceFromJSON,
    exportToJSON,
  };
}

type FriendsStorage = Brand<ReturnType<typeof useFriendsStorageSingleton>>;
export const useFriendsStorage = await createSingletonRootAsync<FriendsStorage>(useFriendsStorageSingleton);
