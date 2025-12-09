const download = <T extends object>(name: string, data: T): void => {
  const blob = new Blob([JSON.stringify(data, undefined, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.download = `mkw-${name}-backup_${new Date().toISOString().split("T").at(0)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const upload = (): Promise<string> => {
  const { resolve, reject, promise } = Promise.withResolvers<string>();
  const input = document.createElement("input");
  input.style.display = "none";
  input.type = "file";
  input.accept = "application/json";

  input.addEventListener("cancel", () => {
    input.remove();
    reject("Cancel");
  });
  input.addEventListener("change", () => {
    const file = input.files?.item(0);
    input.remove();

    if (file) {
      resolve(file.text());
    }

    reject("No file retrieved");
  });

  document.body.append(input);
  input.click();

  return promise;
};

export const JSONUtils = {
  download,
  upload,
};
