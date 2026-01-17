import { compile, format, parse } from "date-and-time";

const compiledTime = compile("m:ss.SSS");
const compiledTimeH = compile("H:mm:ss.SSS");

// It would be better to handle it internally without rely on an external library.
export const Time = {
  parse(time: string): number {
    return parse(time, compiledTime).getTime();
  },
  format(timestamp: number): string {
    return format(new Date(timestamp), compiledTime);
  },
  formatH(timestamp: number): string {
    const time = format(new Date(timestamp), compiledTimeH);
    const shortened = time.startsWith("0:") ? 2 : 0;
    return time.slice(shortened);
  },
};
