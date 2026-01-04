import type { Attempt } from "../../attempt/schemas/attempt";
import type { AttemptStorage } from "../../storage/schemas/attempt-storage";

export function toStorage(attempts: Array<Attempt>): Array<AttemptStorage> {
  return attempts.map((attempt) => attempt.raw);
}
