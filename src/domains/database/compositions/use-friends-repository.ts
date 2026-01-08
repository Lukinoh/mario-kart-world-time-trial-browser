import * as v from "valibot";
import { AttemptsEntitySchema } from "../schemas/attempts-entity";
import type { Brand } from "../../_core/utils/brand";
import { JSONUtils } from "../../_core/utils/json-utils";
import { createSingletonRoot } from "../../_core/utils/solid-js";
import { produce } from "solid-js/store";
import { useAttempts } from "../../attempt/compositions/use-attempts";
import { useDatabases } from "./use-databases";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useFriendsRepositorySingleton() {
  const {
    db: {
      friends: { store, setStore, exportToJSON, replaceFromJSON },
    },
  } = useDatabases();

  const { attempts, getTimeRecordsByTrack, getFlattenRecords, merge } = useAttempts(store);

  const addFromJSON = async (): Promise<void> => {
    const text = await JSONUtils.upload();
    const data = v.parse(AttemptsEntitySchema, JSON.parse(text));
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
    attempts,
    getTimeRecordsByTrack,
    shrink,

    // JSON
    addFromJSON,
    replaceFromJSON,
    exportToJSON,
  };
}

type FriendsRepository = Brand<ReturnType<typeof useFriendsRepositorySingleton>>;
export const useFriendsRepository = createSingletonRoot<FriendsRepository>(useFriendsRepositorySingleton);
