import { type Component, onMount } from "solid-js";
import { AttemptsTable } from "../domains/attempt/components/attempts-table";
import { ValibotImportButton } from "../domains/database/components/valibot-import-button/valibot-import-button";
import { VerticalDivider } from "../domains/ui/components/grid/vertical-divider";
import { css } from "@emotion/css";
import { useFriendsRepository } from "../domains/database/compositions/use-friends-repository";
import { usePageTitle } from "./compositions/use-page-title";

const sActions = css({
  display: "flex",
  columnGap: "var(--mk-spacing-medium)",
  alignContent: "right",
  marginBottom: "var(--mk-spacing-large)",
  "> *": {
    marginBottom: 0,
  },
});

export const Friends: Component = () => {
  const friends = useFriendsRepository();
  const { setTitle } = usePageTitle();

  onMount(() => {
    setTitle("Friends");
  });

  return (
    <>
      <div class={sActions}>
        <ValibotImportButton onClick={friends.addFromJSON}>Add</ValibotImportButton>
        <ValibotImportButton onClick={friends.replaceFromJSON}>Replace</ValibotImportButton>
        <VerticalDivider />
        <button onClick={friends.exportToJSON}>Export</button>
        <VerticalDivider />
        <button onClick={friends.shrink}>Shrink</button>
      </div>
      <AttemptsTable attempts={friends.attempts()} showTime={false} />
    </>
  );
};
