import { AttemptsTable } from "../components/attempts-table/attempts-table";
import { defineComponent } from "../tools/utils";
import { useStorage } from "../compositions/storage/use-storage";

export const WorldRecords = defineComponent(() => {
  const storage = useStorage();

  return (
    <>
      <h1>World Records</h1>
      <AttemptsTable attempts={storage.worldRecords.attempts()} />
    </>
  );
});
