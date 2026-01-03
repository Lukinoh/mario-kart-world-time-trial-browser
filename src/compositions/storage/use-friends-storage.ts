import * as v from "valibot";
import { AttemptsStorageSchema } from "../../core/domain/types/attempts-storage";
import type { Brand } from "../../core/helpers/brand";
import { JSONUtils } from "../../core/helpers/json-utils";
import { createIndexedStore } from "./utils/create-indexed-store";
import { createSingletonRoot } from "../../core/helpers/solid-js";
import { produce } from "solid-js/store";
import { useAttempts } from "../utils/use-attempts";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useFriendsStorageSingleton() {
  const { store, setStore, exportToJSON, replaceFromJSON } = createIndexedStore(
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
export const useFriendsStorage = createSingletonRoot<FriendsStorage>(useFriendsStorageSingleton);
