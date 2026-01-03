import { type ViewProps, defineComponent } from "../core/helpers/solid-js";
import { AttemptsTable } from "../components/attempts-table/attempts-table";
import { ValibotImportButton } from "../components/valibot-button/valibot-import-button";
import { VerticalDivider } from "../components/grid-utilities/vertical-divider";
import { css } from "@emotion/css";
import { onMount } from "solid-js";
import { usePersonalStorage } from "../compositions/storage/use-personal-storage";

const sActions = css({
  display: "flex",
  columnGap: "var(--mk-spacing-medium)",
  alignContent: "center",
  marginBottom: "var(--mk-spacing-large)",
  "> *": {
    marginBottom: 0,
  },
});

export const History = defineComponent<ViewProps>((props) => {
  const storage = usePersonalStorage();

  onMount(() => {
    props.setTitle("History");
  });

  return (
    <>
      <div class={sActions}>
        <ValibotImportButton onclick={storage.addFromJSON}>Add</ValibotImportButton>
        <ValibotImportButton onclick={storage.replaceFromJSON}>Replace</ValibotImportButton>
        <VerticalDivider />
        <button onclick={storage.exportToJSON}>Export</button>
        <button onclick={storage.exportForFriendsToJSON}>Export for friends</button>
        <VerticalDivider />
        <button onclick={storage.shrink}>Shrink</button>
      </div>
      <AttemptsTable attempts={storage.attempts()} />
    </>
  );
});
