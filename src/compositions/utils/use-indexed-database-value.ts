import { get as getIdbKeyVal, set as setIdbKeyVal } from "idb-keyval";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
export function useIndexedDatabaseValue<Data>(key: string) {
  const set = (value: Data): Promise<void> => {
    return setIdbKeyVal(key, value);
  };

  const get = (): Promise<Data | undefined> => {
    return getIdbKeyVal<Data>(key);
  };

  return {
    set,
    get,
  };
}
