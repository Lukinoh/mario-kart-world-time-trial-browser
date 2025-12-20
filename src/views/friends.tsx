import { AttemptsTable } from "../components/attempts-table/attempts-table";
import { ValibotImportButton } from "../components/valibot-button/valibot-import-button";
import { css } from "@emotion/css";
import { defineComponent } from "../tools/utils";
import { useFriendsStorage } from "../compositions/storage/use-friends-storage";

const sActions = css({
  display: "flex",
  columnGap: "var(--mk-spacing-medium)",
  alignContent: "right",
  marginBottom: "var(--mk-spacing-large)",
});

export const Friends = defineComponent(() => {
  const storage = useFriendsStorage();

  return (
    <>
      <h1>Friends</h1>
      <div class={sActions}>
        <button onclick={storage.download}>Export</button>
        <ValibotImportButton onclick={storage.restore}>Import</ValibotImportButton>
      </div>
      <AttemptsTable attempts={storage.attempts()} showTime={false} />
    </>
  );
});
