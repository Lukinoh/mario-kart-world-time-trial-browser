import { createMemo } from "solid-js";
import { css } from "@emotion/css";
import { defineComponent } from "../../domains/_core/utils/solid-js";
import { span } from "../../core/helpers/css";

interface VerticalDelimiterProps {
  column?: number;
  row?: number;
}

export const VerticalDivider = defineComponent<VerticalDelimiterProps>((props) => {
  const row = createMemo(() => props.row ?? 1);
  const column = createMemo(() => props.column ?? 1);
  return (
    <div
      class={css(span(column(), row()), {
        borderRight: "var(--mk-border)",
        // Important is needed, because when we import a JSON, the padding of the grid has sometimes priority over this one (non-deterministic).
        padding: "0 !important",
        margin: "0 var(--mk-spacing-medium)",
        // Should not be affected by the grid configuration
        alignSelf: "stretch",
      })}
    ></div>
  );
});
