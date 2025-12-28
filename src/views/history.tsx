import { type ViewProps, defineComponent } from "../core/helpers/solid-js";
import { AttemptsTable } from "../components/attempts-table/attempts-table";
import { ValibotImportButton } from "../components/valibot-button/valibot-import-button";
import { css } from "@emotion/css";
import { onMount } from "solid-js";
import { usePersonalStorage } from "../compositions/storage/use-personal-storage";

const sActions = css({
  display: "flex",
  columnGap: "var(--mk-spacing-medium)",
  alignContent: "right",
  marginBottom: "var(--mk-spacing-large)",
});

export const History = defineComponent<ViewProps>((props) => {
  const storage = usePersonalStorage();

  onMount(() => {
    props.setTitle("History");
  });

  return (
    <>
      <div class={sActions}>
        <button onclick={storage.download}>Export</button>
        <button onclick={storage.downloadForFriends}>Export for friends</button>
        <ValibotImportButton onclick={storage.restore}>Import</ValibotImportButton>
        <button onclick={storage.clean}>Clean data</button>
      </div>
      <AttemptsTable attempts={storage.attempts()} />
    </>
  );
});
