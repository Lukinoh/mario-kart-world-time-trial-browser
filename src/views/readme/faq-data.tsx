import { A } from "@solidjs/router";
import type { Component } from "solid-js";
import { ValibotImportButton } from "../../domains/database/components/valibot-import-button/valibot-import-button";
import { useRepositories } from "../../domains/database/compositions/use-repositories";

export const FaqData: Component = () => {
  const repositories = useRepositories();

  return (
    <>
      <h3>Data</h3>
      <details>
        <summary>How data is stored?</summary>
        <p>
          The data is exclusively stored in your browser using{" "}
          <A href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">IndexedDB</A>. In some browsers, you
          may be asked to allow persistent storage.
        </p>
      </details>
      <details>
        <summary>How can I backup all my data?</summary>
        <button onClick={repositories.download}>Export</button>
      </details>
      <details>
        <summary>How can I restore all my data?</summary>
        <ValibotImportButton onClick={repositories.restore}>Import</ValibotImportButton>
      </details>
    </>
  );
};
