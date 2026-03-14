import type { Component } from "solid-js";
import { SymbolTextButton } from "../domains/ui/components/buttons/symbol-text-button";
import { ValibotImportButton } from "../domains/database/components/valibot-import-button/valibot-import-button";
import { css } from "@emotion/css";
import { useDatabases } from "../domains/database/compositions/use-databases";

const sCode = css({
  whiteSpace: "pre",
});

interface RecoveryProps {
  error: Error;
}

export const Recovery: Component<RecoveryProps> = (props) => {
  const databases = useDatabases();

  return (
    <>
      <h1>Something went wrong.</h1>

      <details>
        <summary>
          <span>Error: {props.error.toString()}</span>
        </summary>
        <code class={sCode}>{JSON.stringify(props.error, undefined, 2)}</code>
      </details>

      <p>Most probably the database is corrupted. Try to recover by following these steps.</p>
      <dl>
        <dt>Step 1</dt>
        <dd>
          <p>Export your database.</p>
          <SymbolTextButton symbol="📤" onClick={databases.download}>
            Export
          </SymbolTextButton>
        </dd>
        <dt>Step 2</dt>
        <dd>
          <p>Import the database you just exported to get some hints about faulty attempt(s).</p>
          <p>
            <ValibotImportButton symbol="📥" onClick={databases.restore}>
              Import
            </ValibotImportButton>
          </p>
        </dd>
        <dt>Step 3</dt>
        <dd>
          <p>
            Open the JSON file with a code or text editor, and remove the faulty attempt(s). Then import again your
            database.
          </p>
          <p>
            <ValibotImportButton symbol="📥" onClick={databases.restore}>
              Import
            </ValibotImportButton>
          </p>
        </dd>

        <dt>Step 4</dt>
        <dd>
          <p>
            The import was successful? Just{" "}
            <a
              href={location.href}
              onClick={() => {
                location.reload();
              }}
            >
              reload
            </a>{" "}
            the page.
          </p>
          <p>
            This is too technical and you got lost? You can find me (@Lukino) on{" "}
            <a target="_blank" href="https://discord.gg/6gDAPxvqh7">
              Mario Kart World Time Trials
            </a>{" "}
            discord. I would be happy to help you.
          </p>
        </dd>
      </dl>
    </>
  );
};
