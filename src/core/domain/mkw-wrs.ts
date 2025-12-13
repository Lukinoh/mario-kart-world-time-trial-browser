import type { AttemptsStorage } from "./types/attempts-storage";

// Parse the document of the page https://mkwrs.com/mkworld/ to retrieve the records
const parse = (doc: Document): AttemptsStorage => {
  const tableLines = doc.querySelectorAll(".wr").item(0)?.children.item(0)?.children;

  const lines = [...(tableLines ?? [])]
    // Remove Header and Total line
    .slice(1, -1)
    .map((line, index) => {
      // Handle cases where you have two or more WRs with the same time (we take the track name of the previous line).
      if (line.children.length === 8) {
        const td = document.createElement("td");
        td.textContent = tableLines?.item(index - 1)?.children.item(0)?.textContent ?? "Not found";
        line.prepend(td);
      }

      const track = line.children.item(0)?.textContent.replace("?", "؟") ?? "Not found";
      const time = line.children.item(1)?.textContent.replace('"', ":").replace("'", ".");
      const name = line.children.item(2)?.textContent ?? "Not found";
      const timestamp = new Date(line.children.item(4)?.textContent ?? 0).getTime();

      const mixedSplitsText = line.children.item(8)?.children.item(0)?.getAttribute("onmouseover");
      const regex = /^show_splits_dynamic\('ttipid_splits', ([^)]+)\);$/;
      const mixedSplits = mixedSplitsText
        ?.match(regex)
        ?.at(1)
        ?.split(",")
        .map((value) => value.replaceAll("'", "").trim());

      const shrooms = mixedSplits?.at(-1)?.split("-");
      const coins = mixedSplits?.at(-2)?.split("-");
      const splits =
        mixedSplits?.slice(0, -2).map((time, index) => {
          return {
            lap: index + 1,
            time: time.length === 6 ? `0:${time}` : time, // Add the 0 if time is 32.234
            shrooms: Number(shrooms?.at(index) ?? -1),
            coins: Number(coins?.at(index) ?? -1),
          };
        }) ?? [];

      return {
        name: name,
        track: track,
        laps: splits.length,
        coins: splits.reduce((acc, split) => acc + split.coins, 0),
        splits,
        timestamp: timestamp,
        time: time?.replace('"', ":").replace("'", "."),
      };
    });

  return {
    version: 1,
    attempts: lines,
  };
};

export const MkwWrs = {
  parse,
};
