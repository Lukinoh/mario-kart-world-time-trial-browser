import type { CSSInterpolation } from "@emotion/css/create-instance";
import { createMemo } from "solid-js";
import { css } from "@emotion/css";
import { defineComponent } from "../../../_core/utils/solid-js";
import { isDefined } from "remeda";
import { span } from "../../css/css";

export interface CellProps {
  text?: string | number;
  row?: number;
  column?: number;
  css?: CSSInterpolation;
}

export const Cell = defineComponent<CellProps>((props) => {
  const cssList = createMemo(() => {
    const list: Array<CSSInterpolation> = [span(props.column ?? 1, props.row ?? 1)];

    if (!isDefined(props.text)) {
      list.push({
        justifySelf: "center",
        alignSelf: "center",
      });
    }

    list.push(props.css);

    return list;
  });

  return <div class={css(cssList())}>{props.text ?? "-"}</div>;
});
