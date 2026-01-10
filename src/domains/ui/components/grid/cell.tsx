import { type Component, createMemo } from "solid-js";
import type { CSSInterpolation } from "@emotion/css/create-instance";
import { css } from "@emotion/css";
import { isDefined } from "remeda";
import { span } from "../../css/css";

export interface CellProps {
  text?: string | number;
  row?: number;
  column?: number;
  css?: CSSInterpolation;
}

export const Cell: Component<CellProps> = (props) => {
  const cssList = createMemo(() => {
    const list: Array<CSSInterpolation> = [span(props.column ?? 1, props.row ?? 1), props.css];

    if (!isDefined(props.text)) {
      list.push({
        justifySelf: "center",
        alignSelf: "center",
      });
    }

    return list;
  });

  return <div class={css(cssList())}>{props.text ?? "-"}</div>;
};
