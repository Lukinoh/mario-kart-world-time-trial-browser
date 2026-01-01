import * as v from "valibot";
import { type StorageOutput, StorageSchema } from "../../core/domain/types/storage";
import type { Brand } from "../../core/helpers/brand";
import { JSONUtils } from "../../core/helpers/json-utils";
import type { ReferenceRecords } from "../../core/domain/types/reference-records";
import { createSingletonRoot } from "../../core/helpers/solid-js";
import { useFriendsStorage } from "./use-friends-storage";
import { usePersonalStorage } from "./use-personal-storage";
import { useWorldRecordStorage } from "./use-world-records-storage";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useStorageSingleton() {
  const personal = usePersonalStorage();
  const friends = useFriendsStorage();
  const worldRecords = useWorldRecordStorage();

  const restore = async (): Promise<void> => {
    const text = await JSONUtils.upload();
    const data = v.parse(StorageSchema, JSON.parse(text));
    personal.setStore(data.personal);
    friends.setStore(data.friends);
    worldRecords.setStore(data.worldRecords);
  };

  const download = (): void => {
    JSONUtils.download<StorageOutput>("all", {
      personal: personal.store,
      friends: friends.store,
      worldRecords: worldRecords.store,
    });
  };

  const getReferenceRecords = (track: string): ReferenceRecords => {
    return [
      ["SB", personal.getSplitRecordByTrack(track)],
      ["WR", worldRecords.getTimeRecordsByTrack(track)],
      ["FR", friends.getTimeRecordsByTrack(track)],
      ["PB", personal.getTimeRecordsByTrack(track)],
    ];
  };

  return {
    personal,
    friends,
    worldRecords,
    getReferenceRecords,
    restore,
    download,
  };
}

type Storage = Brand<ReturnType<typeof useStorageSingleton>>;
export const useStorage = createSingletonRoot<Storage>(useStorageSingleton);
