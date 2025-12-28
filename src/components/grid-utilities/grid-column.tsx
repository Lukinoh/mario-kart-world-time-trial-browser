import type { CSSObject } from "@emotion/css/create-instance";
import type { JSX } from "solid-js";
import { css } from "@emotion/css";
import { defineComponent } from "../../core/helpers/solid-js";

const sGrid = (params: GridColumnProps): string =>
  css({
    display: "grid",
    gridTemplateColumns: params.template,
    textAlign: params.align,
    "> *": {
      padding: "var(--mk-spacing-medium)",
    },
  });

interface GridColumnProps {
  template: CSSObject["gridTemplateColumns"];
  align: CSSObject["textAlign"];
  children: JSX.Element;
}

export const GridColumn = defineComponent<GridColumnProps>((props) => {
  return <div class={sGrid(props)}>{props.children}</div>;
});
