import type { Component, JSX } from "solid-js";
import { SymbolButton } from "./symbol-button";
import { SymbolTextButton } from "./symbol-text-button";
import { isDefined } from "remeda";

interface AdaptativeButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  symbol?: string;
}

export const AdaptativeButton: Component<AdaptativeButtonProps> = (props) => {
  if (isDefined(props.symbol)) {
    if (isDefined(props.children)) {
      return (
        <SymbolTextButton {...props} symbol={props.symbol}>
          {props.children}
        </SymbolTextButton>
      );
    }
    return <SymbolButton {...props} symbol={props.symbol} />;
  }

  return <button {...props}>{props.children}</button>;
};
