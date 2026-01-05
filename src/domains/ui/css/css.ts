import { css } from "@emotion/css";

export const span = (column: number, row: number): string => {
  return css({
    gridColumn: `span ${column}`,
    gridRow: `span ${row}`,
  });
};

export const displayVisible = (isVisible: boolean): string => {
  return css({
    display: isVisible ? undefined : "none",
  });
};
