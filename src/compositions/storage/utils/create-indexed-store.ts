import { type StoreSetter, createStore, unwrap } from "solid-js/store";
import type { Brand } from "../../../core/helpers/brand";
import { JSONUtils } from "../../../core/helpers/json-utils";
import { createIndexedValue } from "./create-indexed-value";
import { onMount } from "solid-js";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function createIndexedStoreFactory<T extends object>(key: string, storeInit: T) {
  const database = createIndexedValue<T>(key);
  const [store, setStoreInternal] = createStore<T>(storeInit);

  onMount(async () => {
    const persistent = await navigator.storage.persist();
    if (persistent) {
      console.info("Storage will not be cleared except by explicit user action.");
    } else {
      console.warn("Storage may be cleared by the UA under storage pressure.");
    }

    setStoreInternal((await database.get()) ?? store);
  });

  const setStore = (newStore: StoreSetter<T>): void => {
    setStoreInternal(newStore);
    // database is asynchronous
    // oxlint-disable-next-line no-floating-promises
    database.set(unwrap(store));
  };

  const restore = async (): Promise<void> => {
    const text = await JSONUtils.upload();
    // oxlint-disable no-unsafe-argument no-unsafe-member-access no-unsafe-assignment
    const data = JSON.parse(text);
    setStore(data);
  };

  const download = (): void => {
    JSONUtils.download(key, store);
  };

  return {
    key: key,
    store,
    setStore,
    restore,
    download,
  };
}

type IndexedStore<T extends object> = Brand<ReturnType<typeof createIndexedStoreFactory<T>>>;
type IndexedStoreFactory = <T extends object>(
  ...args: Parameters<typeof createIndexedStoreFactory<T>>
) => IndexedStore<T>;
export const createIndexedStore: IndexedStoreFactory = createIndexedStoreFactory;
