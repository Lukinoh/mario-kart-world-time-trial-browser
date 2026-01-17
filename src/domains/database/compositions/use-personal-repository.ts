import * as v from "valibot";
import { entries, sum, values } from "remeda";
import type { AttemptEntity } from "../schemas/attempt-entity";
import type { AttemptsEntity } from "../schemas/attempts-entity";
import type { Brand } from "../../_core/utils/brand";
import { JSONUtils } from "../../_core/utils/json-utils";
import { PersonalEntitySchema } from "../schemas/personal-entity";
import { createMemo } from "solid-js";
import { createSingletonRoot } from "../../_core/utils/solid-js";
import { produce } from "solid-js/store";
import { useAttempts } from "../../attempt/compositions/use-attempts";
import { useDatabases } from "./use-databases";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function usePersonalRepositorySingleton() {
  const {
    db: {
      personal: { key, store, setStore, exportToJSON, replaceFromJSON },
    },
  } = useDatabases();

  const {
    attempts,
    lastAttempt,
    getFlattenRecords,
    getTimeRecords,
    getTimeRecordsByTrack,
    getSplitRecordByTrack,
    getSumTimeRecords,
    merge,
  } = useAttempts(store);

  const upsertAttempt = (newAttempt: AttemptEntity): void => {
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

  const getAttemptsCountByTrack = (track: string): number => {
    return store.attemptsCountByTrack[track] ?? 0;
  };
  const getAttemptsCount = createMemo(() => sum(values(store.attemptsCountByTrack)));

  const exportForFriendsToJSON = (): void => {
    JSONUtils.download<AttemptsEntity>(`${key}-for-friends`, {
      version: store.version,
      attempts: getTimeRecords().map((attempt) => attempt.raw),
    });
  };

  const addFromJSON = async (): Promise<void> => {
    const text = await JSONUtils.upload();
    const data = v.parse(PersonalEntitySchema, JSON.parse(text));
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
    upsertAttempt,
    attempts,
    lastAttempt,
    getAttemptsCount,
    getAttemptsCountByTrack,
    getTimeRecordsByTrack,
    getSplitRecordByTrack,
    getSumTimeRecords,
    shrink,

    // JSON
    addFromJSON,
    replaceFromJSON,
    exportToJSON,
    exportForFriendsToJSON,
  };
}

type PersonalRepository = Brand<ReturnType<typeof usePersonalRepositorySingleton>>;
export const usePersonalRepository = createSingletonRoot<PersonalRepository>(usePersonalRepositorySingleton);
