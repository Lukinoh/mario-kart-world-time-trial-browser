import * as v from "valibot";
import { entries, sum, values } from "remeda";
import type { AttemptStorage } from "../../core/domain/types/attempt-storage";
import type { AttemptsStorage } from "../../core/domain/types/attempts-storage";
import type { Brand } from "../../core/helpers/brand";
import { JSONUtils } from "../../core/helpers/json-utils";
import { PersonalStorageSchema } from "../../core/domain/types/personal-storage";
import { createIndexedStore } from "./utils/create-indexed-store";
import { createMemo } from "solid-js";
import { createSingletonRoot } from "../../core/helpers/solid-js";
import { produce } from "solid-js/store";
import { useAttempts } from "../utils/use-attempts";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function usePersonalStorageSingleton() {
  const { key, store, setStore, exportToJSON, replaceFromJSON } = createIndexedStore(
    "personal-attempts",
    PersonalStorageSchema,
    {
      version: 1,
      attempts: [],
      attemptsCountByTrack: {},
      player: "",
    },
  );
  const {
    attempts,
    lastAttempt,
    getFlattenRecords,
    getTimeRecords,
    getTimeRecordsByTrack,
    getSplitRecordByTrack,
    merge,
  } = useAttempts(store);

  const upsertAttempt = (newAttempt: AttemptStorage): void => {
    const index = store.attempts.findIndex((attempt) => attempt.timestamp === newAttempt.timestamp);

    setStore(
      produce((store) => {
        if (index === -1) {
          store.attemptsCountByTrack[newAttempt.track] = getAttemptsCountByTrack(newAttempt.track) + 1;
          store.attempts.unshift(newAttempt);
        } else {
          store.attempts[index] = newAttempt;
        }
      }),
    );
  };

  const player = createMemo(() => store.player);
  const setPlayer = (player: string): void => {
    setStore("player", player);
  };
  const getAttemptsCountByTrack = (track: string): number => {
    return store.attemptsCountByTrack[track] ?? 0;
  };
  const getAttemptsCount = createMemo(() => sum(values(store.attemptsCountByTrack)));

  const exportForFriendsToJSON = (): void => {
    JSONUtils.download<AttemptsStorage>(`${key}-for-friends`, {
      version: store.version,
      attempts: getTimeRecords().map((attempt) => attempt.raw),
    });
  };

  const addFromJSON = async (): Promise<void> => {
    const text = await JSONUtils.upload();
    const data = v.parse(PersonalStorageSchema, JSON.parse(text));
    setStore(
      produce((store) => {
        for (const [track, count] of entries(data.attemptsCountByTrack)) {
          store.attemptsCountByTrack[track] = getAttemptsCountByTrack(track) + count;
        }
        store.attempts = merge(data.attempts);
      }),
    );
  };

  const shrink = (): void => {
    const flattenRecords = getFlattenRecords();
    setStore(
      produce((store) => {
        store.attempts = flattenRecords;
      }),
    );
  };

  return {
    store,
    setStore,
    upsertAttempt,
    attempts,
    lastAttempt,
    player,
    setPlayer,
    getAttemptsCount,
    getAttemptsCountByTrack,
    getTimeRecordsByTrack,
    getSplitRecordByTrack,
    shrink,

    // JSON
    addFromJSON,
    replaceFromJSON,
    exportToJSON,
    exportForFriendsToJSON,
  };
}

type PersonalStorage = Brand<ReturnType<typeof usePersonalStorageSingleton>>;
export const usePersonalStorage = createSingletonRoot<PersonalStorage>(usePersonalStorageSingleton);
