import { type BroadcastChannel, useBroadcastChannel } from "../../_core/compositions/use-broadcast-channel";
import type { Attempt } from "../../attempt/schemas/attempt";
import type { ReferenceRecords } from "../../attempt/types/reference-records";
import type { SumTimeRecords } from "../../attempt/types/sum-time-records";

interface ObsRequest {
  type: "request";
}

export interface ObsResponse {
  type: "response";
  data?: {
    last: Attempt;
    references: ReferenceRecords;
    sumTimeRecords: SumTimeRecords;
  };
}

export function useObsBroadcastChannel(): BroadcastChannel<ObsRequest | ObsResponse> {
  return useBroadcastChannel<ObsRequest | ObsResponse>("obs-channel");
}
