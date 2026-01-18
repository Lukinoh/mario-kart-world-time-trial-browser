import { compile, format } from "date-and-time";

const compiledDay = compile("YYYY.MM.DD");
const compiledTime = compile("HH:mm:ss");

// It would be better to handle it internally without rely on an external library.
export const DateTime = {
  formatDate(timestamp: number): string {
    return format(new Date(timestamp), compiledDay);
  },
  formatTime(timestamp: number): string {
    return format(new Date(timestamp), compiledTime);
  },
};
