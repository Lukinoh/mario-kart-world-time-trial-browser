import type { CSSInterpolation, CSSObject } from "@emotion/css/create-instance";
import { capitalize, isDefined, isTruthy } from "remeda";

export interface CellCssArgs {
  mono?: boolean;
  bold?: boolean;
  extraPadding?: "left" | "right";
  xAlign?: CSSObject["justifySelf"];
  yAlign?: CSSObject["alignSelf"];
  color?: CSSObject["color"];
  textStroke?: CSSObject["WebkitTextStroke"];
}

export const cellCss = (args: CellCssArgs): CSSInterpolation => {
  const cssList: Array<CSSInterpolation> = [];

  if (isTruthy(args.mono)) {
    cssList.push({
      fontFamily: "var(--mono-font)",
    });
  }

  if (isTruthy(args.bold)) {
    cssList.push({
      fontWeight: "bold",
    });
  }

  if (isDefined(args.xAlign)) {
    cssList.push({
      justifySelf: args.xAlign,
    });
  }

  if (isDefined(args.yAlign)) {
    cssList.push({
      alignSelf: args.yAlign,
    });
  }

  if (isDefined(args.extraPadding)) {
    cssList.push({
      // We have to add !important, because sometimes the style does not apply in the good order.
      // On the attempts-comparison-table, we need it, on the attempts-table it seems fine.
      [`padding${capitalize(args.extraPadding)}`]: "var(--mk-spacing-large) !important",
    });
  }

  if (isDefined(args.yAlign)) {
    cssList.push({
      alignSelf: args.yAlign,
    });
  }

  if (isDefined(args.color)) {
    cssList.push({
      color: args.color,
    });
  }

  if (isDefined(args.textStroke)) {
    cssList.push({
      WebkitTextStroke: args.textStroke,
    });
  }

  return cssList;
};
