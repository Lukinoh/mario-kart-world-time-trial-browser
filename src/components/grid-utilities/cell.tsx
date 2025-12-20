import type { CSSInterpolation } from "@emotion/css/create-instance";
import { capitalize } from "remeda";
import { css } from "@emotion/css";
import { defineComponent } from "../../tools/utils";
import { span } from "../../core/helpers/css";

interface CellProps {
  text?: string | number;
  row?: number;
  column?: number;
  align?: "left" | "center" | "right";
  bold?: boolean;
  mono?: boolean;
  extraPadding?: "left" | "right";
}

export const Cell = defineComponent<CellProps>((props) => {
  const cssList: Array<CSSInterpolation> = [
    span(props.column ?? 1, props.row ?? 1),
    {
      textAlign: props.align,
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
