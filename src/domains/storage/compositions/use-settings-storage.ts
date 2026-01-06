import type { Brand } from "../../_core/utils/brand";
import { SettingsStorageSchema } from "../schemas/settings-storage";
import { createMemo } from "solid-js";
import { createSingletonRootAsync } from "../../_core/utils/solid-js";
import { useIndexedStore } from "./indexed/use-indexed-store";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useSettingsStorageSingleton() {
  const { store, setStore, isMounted } = useIndexedStore("settings", SettingsStorageSchema, {
    version: 1,
    player: "",
    isVideoVisible: true,
    isDebug: false,
  });

  const player = createMemo(() => store.player);
  const setPlayer = (player: string): void => {
    setStore("player", player);
  };
  const isVideoVisible = createMemo(() => store.isVideoVisible);
  const setVideoVisible = (video: boolean): void => {
    setStore("isVideoVisible", video);
  };
  const isDebug = createMemo(() => store.isDebug);
  const setIsDebug = (debug: boolean): void => {
    setStore("isDebug", debug);
  };

  return {
    isMounted,
    store,
    setStore,
    player,
    setPlayer,
    isVideoVisible,
    setVideoVisible,
    isDebug,
    setIsDebug,
  };
}

type SettingsStorage = Brand<ReturnType<typeof useSettingsStorageSingleton>>;
export const useSettingsStorage = await createSingletonRootAsync<SettingsStorage>(useSettingsStorageSingleton);
