import type { CSSInterpolation, CSSObject } from "@emotion/css/create-instance";
import { capitalize, isDefined, isTruthy } from "remeda";
import { createMemo } from "solid-js";
import { css } from "@emotion/css";
import { defineComponent } from "../../core/helpers/solid-js";
import { span } from "../../core/helpers/css";

export interface CellProps {
  text?: string | number;
  row?: number;
  column?: number;
  color?: CSSObject["color"];
  textStroke?: string;
  xAlign?: CSSObject["justifySelf"];
  yAlign?: CSSObject["alignSelf"];
  bold?: boolean;
  mono?: boolean;
  extraPadding?: "left" | "right";
}

export const Cell = defineComponent<CellProps>((props) => {
  const cssList = createMemo(() => {
    const list: Array<CSSInterpolation> = [
      span(props.column ?? 1, props.row ?? 1),
      {
        justifySelf: props.xAlign,
        alignSelf: props.yAlign,
        color: props.color,
        "-webkit-text-stroke": props.textStroke,
      },
    ];

    if (isTruthy(props.bold)) {
      list.push({
        fontWeight: "bold",
      });
    }

    if (props.extraPadding) {
      list.push({
        // We have to add !important, because sometimes the style does not apply in the good order.
        // On the attempts-comparison-table, we need it, on the attempts-table it seems fine.
        [`padding${capitalize(props.extraPadding)}`]: "var(--mk-spacing-large) !important",
      });
    }

    if (isTruthy(props.mono)) {
      list.push({
        fontFamily: "var(--mono-font)",
      });
    }

    if (!isDefined(props.text)) {
      list.push({
        justifySelf: "center",
        alignSelf: "center",
      });
    }

    return list;
  });

  return <div class={css(...cssList())}>{props.text ?? "-"}</div>;
});
