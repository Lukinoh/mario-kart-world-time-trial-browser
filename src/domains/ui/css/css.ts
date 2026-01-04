import { css } from "@emotion/css";

export const span = (column: number, row: number): string => {
  return css({
    gridColumn: `span ${column}`,
    gridRow: `span ${row}`,
  });
};
