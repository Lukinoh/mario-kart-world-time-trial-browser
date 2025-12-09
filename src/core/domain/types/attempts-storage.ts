import type { Attempt } from "./attempt";

export interface AttemptsStorage {
  version: number;
  attempts: Array<Attempt>;
}
