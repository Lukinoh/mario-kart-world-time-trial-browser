import { Cell, type CellProps } from "../grid-utilities/cell";
import { MINUS, PLUS, PLUS_OR_MINUS } from "../../core/characters";
import { createMemo } from "solid-js";
import { defineComponent } from "../../core/helpers/solid-js";

export const DeltaCell = defineComponent<CellProps>((props) => {
  const color = createMemo<CellProps>(() => {
    const text = props.text?.toString() ?? "";

    if (text.startsWith(PLUS)) {
      return {
        color: "#ff5a04",
        textStroke: "0.03rem #950000",
      };
    }

    if (text.startsWith(MINUS)) {
      return {
        color: "#0498fe",
        textStroke: "0.03rem #023d69",
      };
    }

    if (text.startsWith(PLUS_OR_MINUS)) {
      return {
        color: "gray",
      };
    }

    return {};
  });

  return <Cell {...props} {...color()} />;
});
