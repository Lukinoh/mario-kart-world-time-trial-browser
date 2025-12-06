import { Debug } from "./components/debug";
import { defineComponent } from "./tools/utils";
import { useTimeTrial } from "./compositions/use-time-trial";

export const App = defineComponent(() => {
  const timeTrial = useTimeTrial("TIME_UPDATE", true);

  return (
    <>
      <Debug timeTrial={timeTrial}></Debug>
    </>
  );
});
