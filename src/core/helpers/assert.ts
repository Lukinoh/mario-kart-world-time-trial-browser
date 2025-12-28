export function assert(condition: unknown, msg?: string): asserts condition {
  // oxlint-disable-next-line strict-boolean-expressions
  if (!condition) {
    throw new Error(msg);
  }
}
