import { createRoot } from "solid-js";

/**
 * This function returns a lazy singleton.
 * It is important to be a lazy singleton, otherwise, when we open the popup-obs,
 * the use-alone would be created even if the alone-dialog component is not used.
 */
// We do not use createSingletonRoot from @solid-primitives/rootless, because we want to keep it created even if not used.
export function createSingletonRoot<T>(useAsSingleton: () => T): () => T {
  let instance: T | undefined = undefined;
  return () => {
    instance = instance ?? createRoot(useAsSingleton);
    return instance;
  };
}

/**
 * This function returns an eager singleton by definition
 */
export async function createSingletonRootAsync<T>(
  useAsSingleton: () => T & { isMounted: Promise<void> },
): Promise<() => T> {
  const instance = createRoot(useAsSingleton);
  await instance.isMounted;
  return () => instance;
}
