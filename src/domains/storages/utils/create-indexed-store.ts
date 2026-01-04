import * as v from "valibot";
import { type SetStoreFunction, createStore, reconcile, unwrap } from "solid-js/store";
import type { Brand } from "../../_core/utils/brand";
import { JSONUtils } from "../../_core/utils/json-utils";
import { createIndexedValue } from "./create-indexed-value";
import { onMount } from "solid-js";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function createIndexedStoreFactory<O extends object, S extends v.GenericSchema<unknown, O>>(
  key: string,
  schema: S,
  storeInit: v.InferOutput<S>,
) {
  const database = createIndexedValue<v.InferOutput<S>>(key);
  const [store, setStoreInternal] = createStore<v.InferOutput<S>>(storeInit);

  onMount(async () => {
    const persistent = await navigator.storage.persist();
    if (persistent) {
      console.info("Storage will not be cleared except by explicit user action.");
    } else {
      console.warn("Storage may be cleared by the UA under storage pressure.");
    }

    setStoreInternal((await database.get()) ?? store);
  });

  const setStore: SetStoreFunction<v.InferOutput<S>> = (...params: Array<unknown>) => {
    // @ts-expect-error Not possible to wrap without using ts-expect-error or using any
    setStoreInternal(...params);

    // database is asynchronous
    // oxlint-disable-next-line no-floating-promises
    database.set(unwrap(store));
  };

  const replaceFromJSON = async (): Promise<void> => {
    const text = await JSONUtils.upload();
    const data = v.parse(schema, JSON.parse(text));
    setStore(reconcile(data));
  };

  const exportToJSON = (): void => {
    JSONUtils.download<v.InferOutput<S>>(key, store);
  };

  return {
    key: key,
    store,
    setStore,
    exportToJSON,
    replaceFromJSON,
  };
}

type IndexedStore<O extends object, S extends v.GenericSchema<unknown, O>> = Brand<
  ReturnType<typeof createIndexedStoreFactory<O, S>>
>;
type IndexedStoreFactory = <O extends object, S extends v.GenericSchema<unknown, O>>(
  ...args: Parameters<typeof createIndexedStoreFactory<O, S>>
) => IndexedStore<O, S>;
export const createIndexedStore: IndexedStoreFactory = createIndexedStoreFactory;
