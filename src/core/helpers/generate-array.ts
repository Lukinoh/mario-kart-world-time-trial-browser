export const generateArray = (length: number): Array<number> => {
  return Array.from({ length: length }, (_v, index) => index + 1);
};
