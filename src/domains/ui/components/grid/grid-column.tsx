import type { Component, JSX } from "solid-js";
import type { CSSObject } from "@emotion/css/create-instance";
import type { Classable } from "../../../_core/types/classable";
import { css } from "@emotion/css";

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

interface GridColumnProps extends Classable {
  template: CSSObject["gridTemplateColumns"];
  xAlign?: CSSObject["justifyItems"];
  yAlign?: CSSObject["alignItems"];
  children: JSX.Element;
}

export const GridColumn: Component<GridColumnProps> = (props) => {
  return <div class={css(sGrid(props), props.class)}>{props.children}</div>;
};
