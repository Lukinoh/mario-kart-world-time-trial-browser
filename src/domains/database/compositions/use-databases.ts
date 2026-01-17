import * as v from "valibot";
import { type DatabasesEntity, DatabasesEntitySchema } from "../schemas/databases-entity";
import { AttemptsEntitySchema } from "../schemas/attempts-entity";
import type { Brand } from "../../_core/utils/brand";
import { JSONUtils } from "../../_core/utils/json-utils";
import { PersonalEntitySchema } from "../schemas/personal-entity";
import { SettingsEntitySchema } from "../schemas/settings-entity";
import { createSingletonRootAsync } from "../../_core/utils/solid-js";
import { onMount } from "solid-js";
import { useIndexedStore } from "./indexed/use-indexed-store";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useDatabasesSingleton() {
  const settings = useIndexedStore("settings-database", SettingsEntitySchema, {
    version: 1,
    player: "",
    isVideoVisible: true,
    isDebug: false,
    playbackRate: 1,
    obs: {
      popup: {
        width: 440,
        height: 840,
        top: 100,
        left: 100,
      },
    },
  });
  const personal = useIndexedStore("personal-database", PersonalEntitySchema, {
    version: 1,
    attempts: [],
    attemptsCountByTrack: {},
  });
  const worldRecords = useIndexedStore("world-records-database", AttemptsEntitySchema, {
    version: 1,
    attempts: [],
  });
  const friends = useIndexedStore("friends-database", AttemptsEntitySchema, {
    version: 1,
    attempts: [],
  });

  const { promise: isMounted, resolve } = Promise.withResolvers<void>();

  onMount(async () => {
    await Promise.all([settings.isMounted, personal.isMounted, friends.isMounted, worldRecords.isMounted]);
    resolve();
  });

  const restore = async (): Promise<void> => {
    const text = await JSONUtils.upload();
    const data = v.parse(DatabasesEntitySchema, JSON.parse(text));
    personal.setStore(data.personal);
    friends.setStore(data.friends);
    worldRecords.setStore(data.worldRecords);
    settings.setStore(data.settings);
  };

  const download = (): void => {
    JSONUtils.download<DatabasesEntity>("all", {
      personal: personal.store,
      friends: friends.store,
      worldRecords: worldRecords.store,
      settings: settings.store,
    });
  };

  return {
    isMounted,
    restore,
    download,
    db: {
      settings,
      personal,
      worldRecords,
      friends,
    },
  };
}

type Databases = Brand<ReturnType<typeof useDatabasesSingleton>>;
export const useDatabases = await createSingletonRootAsync<Databases>(useDatabasesSingleton);
