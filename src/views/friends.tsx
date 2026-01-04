import { type ViewProps, defineComponent } from "../domains/_core/utils/solid-js";
import { AttemptsTable } from "../domains/attempt/components/attempts-table";
import { ValibotImportButton } from "../domains/storages/components/valibot-import-button/valibot-import-button";
import { VerticalDivider } from "../domains/ui/components/grid/vertical-divider";
import { css } from "@emotion/css";
import { onMount } from "solid-js";
import { useFriendsStorage } from "../domains/storages/compositions/use-friends-storage";

const sActions = css({
  display: "flex",
  columnGap: "var(--mk-spacing-medium)",
  alignContent: "right",
  marginBottom: "var(--mk-spacing-large)",
  "> *": {
    marginBottom: 0,
  },
});

export const Friends = defineComponent<ViewProps>((props) => {
  const storage = useFriendsStorage();

  onMount(() => {
    props.setTitle("Friends");
  });

  return (
    <>
      <div class={sActions}>
        <ValibotImportButton onclick={storage.addFromJSON}>Add</ValibotImportButton>
        <ValibotImportButton onclick={storage.replaceFromJSON}>Replace</ValibotImportButton>
        <VerticalDivider />
        <button onClick={storage.exportToJSON}>Export</button>
        <VerticalDivider />
        <button onclick={storage.shrink}>Shrink</button>
      </div>
      <AttemptsTable attempts={storage.attempts()} showTime={false} />
    </>
  );
});
