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
          The data is exclusively stored in your browser using IndexedDB. In some browsers, you may be asked to allow
          persistent storage.
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
      <details>
        <summary>How can I import my current records?</summary>
        <p>The simplest way is to play your ghosts. It will take some time, but it works.</p>
        <p>
          Alternatively, you could modify the database manually by exporting your history and adding the necessary
          values manually. This is more technical, and implies the fact that you already know your splits (time,
          shrooms, and coins).
        </p>
      </details>
    </>
  );
};
