import { AttemptsTable } from "../components/attempts-table/attempts-table";
import { defineComponent } from "../tools/utils";
import { useStorage } from "../compositions/storage/use-storage";

export const History = defineComponent(() => {
  const storage = useStorage();

  return (
    <>
      <h1>History</h1>
      <AttemptsTable attempts={storage.personal.attempts()} />
    </>
  );
});
