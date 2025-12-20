import { AttemptsTable } from "../components/attempts-table/attempts-table";
import { ValibotImportButton } from "../components/valibot-button/valibot-import-button";
import { css } from "@emotion/css";
import { defineComponent } from "../tools/utils";
import { usePersonalStorage } from "../compositions/storage/use-personal-storage";

const sActions = css({
  display: "flex",
  columnGap: "var(--mk-spacing-medium)",
  alignContent: "right",
  marginBottom: "var(--mk-spacing-large)",
});

export const History = defineComponent(() => {
  const storage = usePersonalStorage();

  return (
    <>
      <h1>History</h1>
      <div class={sActions}>
        <button onclick={storage.download}>Export</button>
        <button onclick={storage.downloadForFriends}>Export for friends</button>
        <ValibotImportButton onclick={storage.restore}>Import</ValibotImportButton>
      </div>
      <AttemptsTable attempts={storage.attempts()} />
    </>
  );
});
