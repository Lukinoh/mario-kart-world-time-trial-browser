export function fileUpload(accept: string): Promise<File> {
  const { resolve, reject, promise } = Promise.withResolvers<File>();
  const input = document.createElement("input");
  input.style.display = "none";
  input.type = "file";
  input.accept = accept;

  input.addEventListener("cancel", () => {
    input.remove();
    reject("Cancel");
  });
  input.addEventListener("change", () => {
    const file = input.files?.item(0);
    input.remove();

    if (file) {
      resolve(file);
    }

    reject("No file retrieved");
  });

  document.body.append(input);
  input.click();

  return promise;
}
