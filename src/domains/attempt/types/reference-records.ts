import type { Attempt } from "../schemas/attempt";

export interface ReferenceRecords {
  BPS?: Array<Attempt>;
  WR?: Array<Attempt>;
  FR?: Array<Attempt>;
  PB?: Array<Attempt>;
}
