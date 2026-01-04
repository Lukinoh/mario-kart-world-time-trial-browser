import { CORS_PROXY_URL, WORLD_RECORD_URL } from "../../_core/constants/external-urls";
import { AttemptsStorageSchema } from "../schemas/attempts-storage";
import type { Brand } from "../../_core/utils/brand";
import { JSONUtils } from "../../_core/utils/json-utils";
import { MkwWrs } from "../../_core/utils/mkw-wrs";
import { createIndexedStore } from "../utils/create-indexed-store";
import { createSingletonRoot } from "../../_core/utils/solid-js";
import { useAttempts } from "../../attempt/compositions/use-attempts";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useWorldRecordsStorageSingleton() {
  const { store, setStore, replaceFromJSON, key } = createIndexedStore(
    "world-records-attempts",
    AttemptsStorageSchema,
    {
      version: 1,
      attempts: [],
    },
  );
  const { attempts, getTimeRecordsByTrack } = useAttempts(store);

  const automaticProcessForMkrws = async (): Promise<void> => {
    const response = await fetch(`${CORS_PROXY_URL}${WORLD_RECORD_URL}`);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    setStore(MkwWrs.parse(doc));
  };

  const manualProcessForMkwrs = async (): Promise<void> => {
    // oxlint-disable restrict-template-expressions
    await navigator.clipboard.writeText(`
      const download = ${JSONUtils.download};
      const getAttemptsFromMkrws = ${MkwWrs.parse};
      download("${key}", getAttemptsFromMkrws(document))
   `);
    // oxlint-enable restrict-template-expressions
    open(WORLD_RECORD_URL, "_blank");
  };

  return {
    store,
    setStore,
    attempts,
    automaticProcessForMkrws,
    manualProcessForMkwrs,
    getTimeRecordsByTrack,

    // JSON
    replaceFromJSON,
  };
}

type WorldRecordStorage = Brand<ReturnType<typeof useWorldRecordsStorageSingleton>>;
export const useWorldRecordStorage = createSingletonRoot<WorldRecordStorage>(useWorldRecordsStorageSingleton);
