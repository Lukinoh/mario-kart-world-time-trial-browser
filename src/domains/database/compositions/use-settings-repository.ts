import type { Brand } from "../../_core/utils/brand";
import { createMemo } from "solid-js";
import { createSingletonRoot } from "../../_core/utils/solid-js";
import { useDatabases } from "./use-databases";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useSettingsRepositorySingleton() {
  const {
    db: {
      settings: { store, setStore },
    },
  } = useDatabases();

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

  const playbackRate = createMemo(() => store.playbackRate);
  const setPlaybackRate = (rate: number): void => {
    setStore("playbackRate", rate);
  };

  return {
    player,
    setPlayer,
    isVideoVisible,
    setVideoVisible,
    isDebug,
    setIsDebug,
    playbackRate,
    setPlaybackRate,
  };
}

type SettingsRepository = Brand<ReturnType<typeof useSettingsRepositorySingleton>>;
export const useSettingsRepository = createSingletonRoot<SettingsRepository>(useSettingsRepositorySingleton);
