import { execSync } from "node:child_process";
import path from "node:path";

const REPOSITORY_ROOT = execSync("git rev-parse --show-toplevel", { encoding: "utf8" }).trim();

export class PathHelper {
  private constructor() {}

  static root(...args: Array<string>): string {
    return path.join(REPOSITORY_ROOT, ...args);
  }

  static concat(...args: Array<string>): string {
    return path.join("", ...args);
  }
}
