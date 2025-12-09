import type { Brand } from "../../core/helpers/brand";
import { JSONUtils } from "../../core/helpers/json-utils";
import { createSingletonRoot } from "@solid-primitives/rootless";
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
    // Use Validbot or Zod to remove the rule exception
    // oxlint-disable no-unsafe-argument no-unsafe-member-access no-unsafe-assignment
    const data = JSON.parse(text);
    personal.setStore(data.personal);
    friends.setStore(data.friends);
    worldRecords.setStore(data.worldRecords);
    // oxlint-enable no-unsafe-argument no-unsafe-member-access no-unsafe-assignment
  };

  const download = (): void => {
    JSONUtils.download("all", {
      personal: personal.store,
      friends: friends.store,
      worldRecords: worldRecords.store,
    });
  };

  return {
    personal,
    friends,
    worldRecords,
    restore,
    download,
  };
}

type Storage = Brand<ReturnType<typeof useStorageSingleton>>;
export const useStorage = createSingletonRoot<Storage>(useStorageSingleton);
