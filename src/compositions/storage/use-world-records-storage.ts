import { CORS_PROXY_URL, WORLD_RECORD_URL } from "../../core/external-urls";
import { AttemptsStorageSchema } from "../../core/domain/types/attempts-storage";
import type { Brand } from "../../core/helpers/brand";
import { JSONUtils } from "../../core/helpers/json-utils";
import { MkwWrs } from "../../core/domain/mkw-wrs";
import { createIndexedStore } from "./utils/create-indexed-store";
import { createMemo } from "solid-js";
import { createSingletonRoot } from "@solid-primitives/rootless";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useWorldRecordsStorageSingleton() {
  const { store, setStore, restore, download, key } = createIndexedStore(
    "world-records-attempts",
    AttemptsStorageSchema,
    {
      version: 1,
      attempts: [],
    },
  );
  const attempts = createMemo(() => store.attempts);

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
    restore,
    download,
  };
}

type WorldRecordStorage = Brand<ReturnType<typeof useWorldRecordsStorageSingleton>>;
export const useWorldRecordStorage = createSingletonRoot<WorldRecordStorage>(useWorldRecordsStorageSingleton);
