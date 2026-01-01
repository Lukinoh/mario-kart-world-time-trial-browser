import type { CSSInterpolation, CSSObject } from "@emotion/css/create-instance";
import { capitalize, isDefined, isTruthy } from "remeda";
import { css } from "@emotion/css";
import { defineComponent } from "../../core/helpers/solid-js";
import { span } from "../../core/helpers/css";

interface CellProps {
  text?: string | number;
  row?: number;
  column?: number;
  xAlign?: CSSObject["justifySelf"];
  yAlign?: CSSObject["alignSelf"];
  bold?: boolean;
  mono?: boolean;
  extraPadding?: "left" | "right";
}

export const Cell = defineComponent<CellProps>((props) => {
  const cssList: Array<CSSInterpolation> = [
    span(props.column ?? 1, props.row ?? 1),
    {
      justifySelf: props.xAlign,
      alignSelf: props.yAlign,
    },
  ];

  if (isTruthy(props.bold)) {
    cssList.push({
      fontWeight: "bold",
    });
  }

  if (props.extraPadding) {
    cssList.push({
      [`padding${capitalize(props.extraPadding)}`]: "var(--mk-spacing-large)",
    });
  }

  if (isTruthy(props.mono)) {
    cssList.push({
      fontFamily: "var(--mono-font)",
    });
  }

  if (!isDefined(props.text)) {
    cssList.push({
      justifySelf: "center",
      alignSelf: "center",
    });
  }

  return <div class={css(...cssList)}>{props.text ?? "-"}</div>;
});
