import { get as getIdbKeyVal, set as setIdbKeyVal } from "idb-keyval";
import type { Brand } from "../../../core/helpers/brand";
import { newQueue } from "@henrygd/queue";

// All requests to the Indexed Database must be done one after the other
const queue = newQueue(1);

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function createIndexedValueFactory<Data>(key: string) {
  const set = (value: Data): Promise<void> => {
    return queue.add(() => setIdbKeyVal(key, value));
  };

  const get = (): Promise<Data | undefined> => {
    return queue.add(() => getIdbKeyVal<Data>(key));
  };

  return {
    set,
    get,
  };
}

type IndexedValue<T> = Brand<ReturnType<typeof createIndexedValueFactory<T>>>;
type IndexedValueFactory = <T>(...args: Parameters<typeof createIndexedValueFactory<T>>) => IndexedValue<T>;
export const createIndexedValue: IndexedValueFactory = createIndexedValueFactory;
