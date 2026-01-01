import { type ViewProps, defineComponent } from "../core/helpers/solid-js";
import { createMemo, onMount } from "solid-js";
import { AttemptsTable } from "../components/attempts-table/attempts-table";
import { useStorage } from "../compositions/storage/use-storage";

export const Live = defineComponent<ViewProps>((props) => {
  const storage = useStorage();

  const selectedTrack = createMemo(() => storage.personal.lastAttempt()?.raw.track);

  onMount(() => {
    props.setTitle("Live");
  });

  return (
    <>
      <h2>Quick view</h2>
      <AttemptsTable attempts={storage.personal.attempts()} defaultTrack={selectedTrack()} />
    </>
  );
});
