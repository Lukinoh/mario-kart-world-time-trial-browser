import { createMemo } from "solid-js";
import { css } from "@emotion/css";
import { defineComponent } from "../../tools/utils";
import { span } from "../../core/helpers/css";

interface VerticalDelimiterProps {
  row?: number;
}

export const VerticalDivider = defineComponent<VerticalDelimiterProps>((props) => {
  const row = createMemo(() => props.row ?? 1);
  return (
    <div
      class={css(span(1, row()), {
        borderRight: "var(--mk-border)",
        // Important is needed, because when we import a JSON, the padding of the grid has sometimes priority over this one (non-deterministic).
        padding: "0 !important",
        margin: "0 var(--mk-spacing-medium)",
      })}
    ></div>
  );
});
