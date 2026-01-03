import { Cell, type CellProps } from "../grid-utilities/cell";
import { capitalize, isDefined } from "remeda";
import type { Attempt } from "../../core/domain/local/attempt";
import type { ReferenceRecords } from "../../core/domain/types/reference-records";
import { createMemo } from "solid-js";
import { defineComponent } from "../../core/helpers/solid-js";

interface F1CellProps extends CellProps {
  attempt: Attempt;
  referencesRecords: ReferenceRecords;
  sIndex: number;
  type: "time" | "accumulatedTime";
}

export const F1Cell = defineComponent<F1CellProps>((props) => {
  const parsedType = createMemo(() => `parsed${capitalize(props.type)}` as const);

  const color = createMemo<CellProps>(() => {
    const attemptTime = props.attempt.splits.at(props.sIndex)?.[parsedType()];
    const wrTime = props.referencesRecords.WR?.at(0)?.splits.at(props.sIndex)?.[parsedType()];
    const bpsTime = props.referencesRecords.BPS?.at(0)?.splits.at(props.sIndex)?.[parsedType()];
    const pbTime = props.referencesRecords.PB?.at(0)?.splits.at(props.sIndex)?.[parsedType()];

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

  return <Cell {...props} {...color()} text={props.attempt.splits.at(props.sIndex)?.[props.type]} />;
});
