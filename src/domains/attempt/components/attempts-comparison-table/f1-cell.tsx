import { Cell, type CellProps } from "../../../ui/components/grid/cell";
import { type CellCssArgs, cellCss } from "../../../ui/css/cell-css";
import { type Component, createMemo } from "solid-js";
import { capitalize, isDefined } from "remeda";
import type { Attempt } from "../../schemas/attempt";
import type { ReferenceRecords } from "../../types/reference-records";

interface F1CellProps extends CellProps {
  attempt: Attempt;
  referencesRecords: ReferenceRecords;
  sIndex: number;
  type: "time" | "accumulatedTime";
}

export const F1Cell: Component<F1CellProps> = (props) => {
  const parsedType = createMemo(() => `parsed${capitalize(props.type)}` as const);

  const color = createMemo<CellCssArgs>(() => {
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

      if (isDefined(pbTime) && attemptTime >= pbTime) {
        return {
          color: "var(--mk-f1-yellow)",
        };
      }
    }

    return {};
  });

  return (
    <Cell {...props} css={[cellCss(color()), props.css]} text={props.attempt.splits.at(props.sIndex)?.[props.type]} />
  );
};
