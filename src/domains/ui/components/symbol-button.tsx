import type { JSX } from "solid-js";
import { css } from "@emotion/css";
import { defineComponent } from "../../_core/utils/solid-js";

const sContent = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--mk-spacing-small)",
});

const sSymbol = css({
  width: "var(--mk-spacing-large)",
  lineHeight: 0,
});

interface SymbolButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  symbol: string;
}

export const SymbolButton = defineComponent<SymbolButtonProps>((props) => {
  return (
    <button {...props}>
      <div class={sContent}>
        <span class={sSymbol}>{props.symbol}</span>
        {props.children}
      </div>
    </button>
  );
});
