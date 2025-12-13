import type { Brand } from "../../core/helpers/brand";
import { ConfigurationStorageSchema } from "../../core/domain/types/configuration-storage";
import { createIndexedStore } from "./utils/create-indexed-store";
import { createMemo } from "solid-js";
import { createSingletonRoot } from "@solid-primitives/rootless";
import { produce } from "solid-js/store";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useConfigurationStorageSingleton() {
  const { store, setStore, restore, download } = createIndexedStore("configuration", ConfigurationStorageSchema, {
    version: 1,
    name: "Noname",
  });

  const name = createMemo(() => store.name);
  const setName = (name: string): void => {
    setStore(
      produce((store) => {
        store.name = name;
      }),
    );
  };

  return {
    store,
    setStore,
    name,
    setName,
    restore,
    download,
  };
}

type ConfigurationStorage = Brand<ReturnType<typeof useConfigurationStorageSingleton>>;
export const useConfigurationStorage = createSingletonRoot<ConfigurationStorage>(useConfigurationStorageSingleton);
