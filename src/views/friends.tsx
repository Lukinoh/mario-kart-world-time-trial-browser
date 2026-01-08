import { type ViewProps, defineComponent } from "../domains/_core/utils/solid-js";
import { AttemptsTable } from "../domains/attempt/components/attempts-table";
import { ValibotImportButton } from "../domains/database/components/valibot-import-button/valibot-import-button";
import { VerticalDivider } from "../domains/ui/components/grid/vertical-divider";
import { css } from "@emotion/css";
import { onMount } from "solid-js";
import { useFriendsRepository } from "../domains/database/compositions/use-friends-repository";

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
  const friends = useFriendsRepository();

  onMount(() => {
    props.setTitle("Friends");
  });

  return (
    <>
      <div class={sActions}>
        <ValibotImportButton onclick={friends.addFromJSON}>Add</ValibotImportButton>
        <ValibotImportButton onclick={friends.replaceFromJSON}>Replace</ValibotImportButton>
        <VerticalDivider />
        <button onclick={friends.exportToJSON}>Export</button>
        <VerticalDivider />
        <button onclick={friends.shrink}>Shrink</button>
      </div>
      <AttemptsTable attempts={friends.attempts()} showTime={false} />
    </>
  );
});
