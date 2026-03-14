import type { Component, JSX } from "solid-js";
import { css } from "@emotion/css";

const sContent = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--mk-spacing-small)",
});

const sSymbol = css({
  width: "var(--mk-spacing-large)",
  lineHeight: 0,
  fontVariantEmoji: "text",
});

interface SymbolTextButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  symbol: string;
}

export const SymbolTextButton: Component<SymbolTextButtonProps> = (props) => {
  return (
    <button {...props}>
      <div class={sContent}>
        <span class={sSymbol}>{props.symbol}</span>
        <span>{props.children}</span>
      </div>
    </button>
  );
};
