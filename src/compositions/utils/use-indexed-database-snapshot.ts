import { entries, setMany } from "idb-keyval";
import { format } from "date-and-time";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
export function useIndexedDatabaseSnapshot() {
  const restore = (entries: Array<[IDBValidKey, unknown]>): Promise<void> => {
    return setMany(entries);
  };

  const extract = (): Promise<Array<[IDBValidKey, unknown]>> => {
    return entries();
  };

  const restoreFromJson = (): void => {
    const input = document.createElement("input");
    input.style.display = "none";
    input.type = "file";
    input.accept = "application/json";

    input.addEventListener("cancel", () => {
      input.remove();
    });
    input.addEventListener("change", async () => {
      const file = input.files?.item(0);
      if (file) {
        const text = await file.text();
        // Ideally add Valibot or Zod to handle parsing in the application
        const data = JSON.parse(text) as Array<[IDBValidKey, unknown]>;
        await restore(data);
        location.reload();
      }
      input.remove();
    });

    document.body.append(input);
    input.click();
  };

  const downloadAsJson = async (): Promise<void> => {
    const data = await extract();
    const blob = new Blob([JSON.stringify(data, undefined, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.download = `mkw-time-trial-${format(new Date(), "YYYY.MM.DD-HH:mm:ss")}.json`;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return {
    downloadAsJson,
    restoreFromJson,
  };
}
