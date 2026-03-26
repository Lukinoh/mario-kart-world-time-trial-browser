import type { Brand } from "../../_core/utils/brand";
import type { ReferenceRecords } from "../../attempt/types/reference-records";
import { createSingletonRoot } from "../../_core/utils/solid-js";
import { useDatabases } from "./use-databases";
import { useFriendsRepository } from "./use-friends-repository";
import { usePersonalRepository } from "./use-personal-repository";
import { useWorldRecordRepository } from "./use-world-records-repository";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useRepositoriesSingleton() {
  const databases = useDatabases();
  const personal = usePersonalRepository();
  const friends = useFriendsRepository();
  const worldRecords = useWorldRecordRepository();

  const getReferenceRecords = (track: string): ReferenceRecords => {
    return {
      PB: personal.getTimeRecordsByTrack(track, true),
      WR: worldRecords.getTimeRecordsByTrack(track),
      BPS: personal.getSplitRecordByTrack(track, true),
      FR: friends.getTimeRecordsByTrack(track),
    };
  };

  return {
    restore: databases.restore,
    download: databases.download,
    getReferenceRecords,
  };
}

type Repositories = Brand<ReturnType<typeof useRepositoriesSingleton>>;
export const useRepositories = createSingletonRoot<Repositories>(useRepositoriesSingleton);
