/**
 * This brand is used to replace inference by a named type.
 *
 * type Something = Brand<ReturnType<typeof createUseSomething>>;
 * const useSomething = createSingletonRoot<Something>(createUseSomething)
 *
 * In this case the type of useSomething is `() => Something`.
 * Without, it would be `() => { ...list of all properties... }`
 */
declare const __brand: unique symbol;
export type Brand<T> = T & { [__brand]?: T };
