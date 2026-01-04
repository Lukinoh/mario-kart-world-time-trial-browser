import { describe, expect, test } from "vitest";
import { getFilename } from "./utils";

describe("getFilename", () => {
  test.for([
    {
      input: "../path/to/my/file.png",
      expected: "file",
    },
    {
      input: "../path/to/my/file.with.dot.png",
      expected: "file.with.dot",
    },
  ])("from $input is $expected", (params) => {
    expect(getFilename(params.input)).toStrictEqual(params.expected);
  });

  test("throws an error if there is no extension", () => {
    expect(() => getFilename("../path/to/my/file")).toThrow();
  });
});
