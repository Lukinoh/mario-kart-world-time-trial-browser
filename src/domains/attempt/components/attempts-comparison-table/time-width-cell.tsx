import { Cell, type CellProps } from "../../../ui/components/grid/cell";
import type { Component } from "solid-js";
import { PLUS_OR_MINUS } from "../../utils/characters";
import { cellCss } from "../../../ui/css/cell-css";
import { css } from "@emotion/css";

const sTimeWidth = css({
  height: 0,
  overflow: "hidden",
  fontFamily: "var(--mono-font)",
});

const sText = cellCss({
  xAlign: "center",
});

export const TimeWidthCell: Component<CellProps> = (props) => {
  return (
    <div>
      <div class={sTimeWidth}>{PLUS_OR_MINUS}0:00.000</div>
      <Cell {...props} css={[sText, props.css]} />
    </div>
  );
};
