#!/usr/bin/env node
import { createInterface } from "node:readline";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

// Release implementation of https://github.com/qoomon/git-conventional-commits?tab=readme-ov-file#release-workflow-with-git-conventional-commits

const branch = exec("git branch --show-current");
if (branch !== "release") {
  console.info("You can release only the release branch");
  process.exit(1);
}

const status = exec("git status --porcelain");
if (status !== "") {
  console.info("Working directory is not clean.");
  console.info("Please commit or stash your changes before running this command.");
  process.exit(1);
}

exec(`git fetch --tags`);
const version = exec("npm --silent run release:version");
const wantRelease = await readAsync(
  `Do you want to create the release commits and tag for version ${version}? [yes/no]`,
);
if (!["yes", "Y", "y"].includes(wantRelease)) {
  process.exit(0);
}

await updateVersion(version);
exec(`git commit -am'build(release): bump project version to ${version}'`);
exec(`npm run release:changelog -- --release ${version} --file 'CHANGELOG.md'`);
exec(`npm run fix`);
exec(`git commit -am'docs(release): create ${version} change log entry'`);
exec(`git tag -a -m'build(release): ${version}' 'v${version}'`);

console.info("Commits and tags created.");
console.info("Check the commits, and the CHANGELOG.md, and then run 'git push --tags'");

/*
 * Utils
 */

function exec(command: string): string {
  return execSync(command, { encoding: "utf8" }).trim();
}

function readAsync(question: string): Promise<string> {
  const { resolve, promise } = Promise.withResolvers<string>();
  const readInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readInterface.question(`${question}\n`, (answer) => {
    readInterface.close();
    resolve(answer);
  });

  return promise;
}

async function updateVersion(version: string): Promise<void> {
  const { default: packageJson } = await import("./package.json", { with: { type: "json" } });
  packageJson.version = version;
  writeFileSync("package.json", `${JSON.stringify(packageJson, undefined, 2)}\n`);
}
