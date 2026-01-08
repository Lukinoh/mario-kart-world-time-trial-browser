import { Cell, type CellProps } from "../../../ui/components/grid/cell";
import { PLUS_OR_MINUS } from "../../utils/characters";
import { css } from "@emotion/css";
import { defineComponent } from "../../../_core/utils/solid-js";

const sTimeWidth = css({
  height: 0,
  overflow: "hidden",
  fontFamily: "var(--mono-font)",
});

export const TimeWidthCell = defineComponent<CellProps>((props) => {
  return (
    <div>
      <div class={sTimeWidth}>{PLUS_OR_MINUS}0:00.000</div>
      <Cell {...props} xAlign="center"></Cell>
    </div>
  );
});
