import { Cell, type CellProps } from "../grid-utilities/cell";
import type { Attempt } from "../../core/domain/local/attempt";
import type { ReferenceRecords } from "../../core/domain/types/reference-records";
import { createMemo } from "solid-js";
import { defineComponent } from "../../core/helpers/solid-js";
import { isDefined } from "remeda";

interface F1CellProps extends CellProps {
  attempt: Attempt;
  referencesRecords: ReferenceRecords;
  sIndex: number;
  type: "time" | "accumulatedTime";
}

export const F1Cell = defineComponent<F1CellProps>((props) => {
  const color = createMemo<CellProps>(() => {
    const attemptTime = props.attempt.splits.at(props.sIndex)?.[props.type];
    const wrTime = props.referencesRecords.WR?.at(0)?.splits.at(props.sIndex)?.[props.type];
    const bpsTime = props.referencesRecords.BPS?.at(0)?.splits.at(props.sIndex)?.[props.type];
    const pbTime = props.referencesRecords.PB?.at(0)?.splits.at(props.sIndex)?.[props.type];

    if (isDefined(attemptTime)) {
      if (isDefined(wrTime) && attemptTime < wrTime) {
        return {
          color: "var(--mk-f1-purple)",
        };
      }

      if (isDefined(bpsTime) && attemptTime < bpsTime) {
        return {
          color: "var(--mk-f1-green)",
        };
      }

      if (isDefined(pbTime) && attemptTime > pbTime) {
        return {
          color: "var(--mk-f1-yellow)",
        };
      }
    }

    return {};
  });

  const getPrettyTime = createMemo(() => {
    if (props.type === "time") {
      return props.attempt.splits.at(props.sIndex)?.raw.time;
    }

    if (props.type === "accumulatedTime") {
      return props.attempt.splits.at(props.sIndex)?.prettyAccumulatedTime;
    }
  });

  return <Cell {...props} {...color()} text={getPrettyTime()} />;
});
