export function toEntities<T extends { raw: unknown }>(wrappedEntities: Array<T>): Array<T["raw"]> {
  return wrappedEntities.map((wrappedEntity) => wrappedEntity.raw);
}
