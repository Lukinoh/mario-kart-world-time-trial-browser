import { type Component, createMemo } from "solid-js";
import { css } from "@emotion/css";
import { span } from "../../css/css";

interface HorizontalDelimiterProps {
  column?: number;
  row?: number;
  thicknessFactor?: number;
}

export const HorizontalDivider: Component<HorizontalDelimiterProps> = (props) => {
  const column = createMemo(() => props.column ?? 1);
  const row = createMemo(() => props.row ?? 1);
  const borderWidth = createMemo(() => `calc(${props.thicknessFactor ?? 1}*var(--border-width))`);
  return (
    <div
      class={css(span(column(), row()), {
        borderBottomStyle: "solid",
        borderBottomWidth: borderWidth(),
        borderBottomColor: "var(--border)",
        // Important is needed, because when we import a JSON, the padding of the grid has sometimes priority over this one (non-deterministic).
        padding: "0 !important",
        margin: "var(--mk-spacing-medium) 0",
        // Should not be affected by the grid configuration
        justifySelf: "stretch",
      })}
    ></div>
  );
};
