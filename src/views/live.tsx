import { AttemptsTable } from "../components/attempts-table/attempts-table";
import { createMemo } from "solid-js";
import { defineComponent } from "../tools/utils";
import { useStorage } from "../compositions/storage/use-storage";

export const Live = defineComponent(() => {
  const storage = useStorage();

  const selectedTrack = createMemo(() => storage.personal.lastAttempt()?.track);

  return (
    <>
      <h1>Live</h1>
      <h2>Quick view</h2>
      <AttemptsTable attempts={storage.personal.attempts()} defaultTrack={selectedTrack()} />
    </>
  );
});
