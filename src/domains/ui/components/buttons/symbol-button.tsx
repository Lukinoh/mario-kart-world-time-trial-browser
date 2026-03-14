import { type Component, type JSX, createMemo } from "solid-js";
import { css } from "@emotion/css";

const sButton = css({
  fontVariantEmoji: "text",
  lineHeight: 1,
  padding: "var(--mk-spacing-small)",
});

interface SymbolButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  symbol: string;
}

export const SymbolButton: Component<SymbolButtonProps> = (props) => {
  const classList = createMemo(() => css(sButton, props.class));

  return (
    <button {...props} class={classList()}>
      {props.symbol}
    </button>
  );
};
