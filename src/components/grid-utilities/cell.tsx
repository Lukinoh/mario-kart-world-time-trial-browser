import type { CSSInterpolation, CSSObject } from "@emotion/css/create-instance";
import { capitalize } from "remeda";
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

  if (props.bold ?? false) {
    cssList.push({
      fontWeight: "bold",
    });
  }

  if (props.extraPadding) {
    cssList.push({
      [`padding${capitalize(props.extraPadding)}`]: "var(--mk-spacing-large)",
    });
  }

  if (props.mono ?? false) {
    cssList.push({
      fontFamily: "var(--mono-font)",
    });
  }

  return <div class={css(...cssList)}>{props.text ?? "-"}</div>;
});
