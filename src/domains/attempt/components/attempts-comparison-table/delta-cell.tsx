import { Cell, type CellProps } from "../../../ui/components/grid/cell";
import { type CellCssArgs, cellCss } from "../../../ui/css/cell-css";
import { MINUS, PLUS, PLUS_OR_MINUS } from "../../utils/characters";
import { createMemo } from "solid-js";
import { defineComponent } from "../../../_core/utils/solid-js";

export const DeltaCell = defineComponent<CellProps>((props) => {
  const color = createMemo<CellCssArgs>(() => {
    const text = props.text?.toString() ?? "";

    if (text.startsWith(PLUS)) {
      return {
        color: "var(--mk-delta-red)",
        textStroke: "var(--mk-delta-stroke-width) var(--mk-delta-red-border)",
      };
    }

    if (text.startsWith(MINUS)) {
      return {
        color: "var(--mk-delta-blue)",
        textStroke: "var(--mk-delta-stroke-width) var(--mk-delta-blue-border)",
      };
    }

    if (text.startsWith(PLUS_OR_MINUS)) {
      return {
        color: "var(--mk-delta-neutral)",
      };
    }

    return {};
  });

  return <Cell {...props} css={[cellCss(color()), props.css]} />;
});
