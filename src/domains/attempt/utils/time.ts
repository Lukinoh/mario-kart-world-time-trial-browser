import { compile, format, parse } from "date-and-time";

const compiledTime = compile("m:ss.SSS");

export const Time = {
  parse(time: string): number {
    return parse(time, compiledTime).getTime();
  },
  format(timestamp: number): string {
    return format(new Date(timestamp), compiledTime);
  },
};
