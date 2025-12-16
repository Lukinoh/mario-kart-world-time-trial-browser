import { AttemptsTable } from "../components/attempts-table/attempts-table";
import { defineComponent } from "../tools/utils";
import { useStorage } from "../compositions/storage/use-storage";

export const Friends = defineComponent(() => {
  const storage = useStorage();

  return (
    <>
      <h1>Friends</h1>
      <AttemptsTable attempts={storage.friends.attempts()} />
    </>
  );
});
