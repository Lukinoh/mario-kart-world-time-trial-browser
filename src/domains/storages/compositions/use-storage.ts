import * as v from "valibot";
import { type StorageOutput, StorageSchema } from "../schemas/storage";
import type { Brand } from "../../_core/utils/brand";
import { JSONUtils } from "../../_core/utils/json-utils";
import type { ReferenceRecords } from "../../attempt/types/reference-records";
import { createSingletonRoot } from "../../_core/utils/solid-js";
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
    return {
      BPS: personal.getSplitRecordByTrack(track, true),
      WR: worldRecords.getTimeRecordsByTrack(track),
      FR: friends.getTimeRecordsByTrack(track),
      PB: personal.getTimeRecordsByTrack(track, true),
    };
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
