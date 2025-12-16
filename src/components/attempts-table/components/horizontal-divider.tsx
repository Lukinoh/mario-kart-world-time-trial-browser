import { createMemo } from "solid-js";
import { css } from "@emotion/css";
import { defineComponent } from "../../../tools/utils";
import { span } from "../../../core/helpers/css";

interface HorizontalDelimiterProps {
  column?: number;
  thicknessFactor?: number;
}

export const HorizontalDivider = defineComponent<HorizontalDelimiterProps>((props) => {
  const column = createMemo(() => props.column ?? 1);
  const borderWidth = createMemo(() => `calc(${props.thicknessFactor ?? 1}*var(--border-width))`);
  return (
    <div
      class={css(span(column(), 1), {
        borderBottomStyle: "solid",
        borderBottomWidth: borderWidth(),
        borderBottomColor: "var(--border)",
        padding: "0",
        margin: "var(--mk-spacing-medium) 0",
      })}
    ></div>
  );
});
