import type { Attempt } from "../../core/types/attempt";

export interface AttemptsStorage {
  version: number;
  attempts: Array<Attempt>;
}
