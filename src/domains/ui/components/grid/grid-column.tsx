import type { CSSObject } from "@emotion/css/create-instance";
import type { JSX } from "solid-js";
import { css } from "@emotion/css";
import { defineComponent } from "../../../_core/utils/solid-js";

const sGrid = (params: GridColumnProps): string =>
  css({
    display: "grid",
    gridTemplateColumns: params.template,
    justifyItems: params.xAlign,
    alignItems: params.yAlign,
    "> *": {
      padding: "var(--mk-spacing-medium)",
    },
  });

interface GridColumnProps {
  template: CSSObject["gridTemplateColumns"];
  xAlign?: CSSObject["justifyItems"];
  yAlign?: CSSObject["alignItems"];
  children: JSX.Element;
}

export const GridColumn = defineComponent<GridColumnProps>((props) => {
  return <div class={sGrid(props)}>{props.children}</div>;
});
