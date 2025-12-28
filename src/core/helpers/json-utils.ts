import { fileUpload } from "./file-upload";

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

const upload = async (): Promise<string> => {
  const file = await fileUpload("application/json");
  return file.text();
};

export const JSONUtils = {
  download,
  upload,
};
