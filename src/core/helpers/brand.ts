/**
 * This brand is used to replace inference by a named type.
 *
 * type UseStorage = Brand<ReturnType<typeof createUseStorage>>;
 * const useStorage = createSingletonRoot<UseStorage>(createUseStorage)
 *
 * In this case the type of useStorage is `() => UseStorage`.
 * Without, it would be `() => { ...list of all properties... }`
 */
declare const __brand: unique symbol;
export type Brand<T> = T & { [__brand]?: T };
