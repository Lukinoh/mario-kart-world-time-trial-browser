import { ValibotImportButton } from "../components/valibot-button/valibot-import-button";
import { defineComponent } from "../tools/utils";
import { useStorage } from "../compositions/storage/use-storage";

export const FAQ = defineComponent(() => {
  const storage = useStorage();

  return (
    <>
      <h1>FAQ</h1>
      <h2>How can I backup all my data?</h2>
      <p>
        <button onclick={storage.download}>Export</button>
      </p>

      <h2>How can I restore all my data?</h2>
      <p>
        <ValibotImportButton onclick={storage.restore}>Import</ValibotImportButton>
      </p>
    </>
  );
});
