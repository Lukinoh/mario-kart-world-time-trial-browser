import { ValibotImportButton } from "../components/valibot-button/valibot-import-button";
import type { ViewProps } from "../core/view-props";
import { defineComponent } from "../tools/utils";
import { onMount } from "solid-js";
import { useStorage } from "../compositions/storage/use-storage";

export const FAQ = defineComponent<ViewProps>((props) => {
  const storage = useStorage();

  onMount(() => {
    props.setTitle("FAQ");
  });

  return (
    <>
      <h2>How data is stored?</h2>
      <p>
        The data is exclusively stored in your browser using IndexedDB. On some browser, you may be ask to allow
        persistent storage.
      </p>

      <h2>How can I backup all my data?</h2>
      <p>
        <button onclick={storage.download}>Export</button>
      </p>

      <h2>How can I restore all my data?</h2>
      <p>
        <ValibotImportButton onclick={storage.restore}>Import</ValibotImportButton>
      </p>

      <h2>What is codetabs.com?</h2>
      <p>
        codetabs.com provides a cors proxy. It allows you to retrieve data from mkwrs.com. Without, it would not be
        possible to have the automatic updates of the world records.
      </p>
    </>
  );
});
