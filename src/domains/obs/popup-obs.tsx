import { Match, Switch, createSignal, onMount } from "solid-js";
import { type ObsResponse, useObs } from "./compositions/use-obs";
import { AttemptsComparisonTable } from "../attempt/components/attempts-comparison-table/attempts-comparison-table";
import { css } from "@emotion/css";
import { defineComponent } from "../_core/utils/solid-js";

const sTable = css({
  position: "absolute",
  top: 0,
  left: 0,
});

export const PopupObs = defineComponent(() => {
  // oxlint-disable-next-line init-declarations no-unassigned-vars
  let tableDiv!: HTMLDivElement;

  const obs = useObs();
  const [data, setData] = createSignal<ObsResponse["data"]>();

  onMount(() => {
    document.title = `${document.title} OBS`;
    obs.onMessage((message) => {
      if (message.type === "response") {
        setData(message.data);
        const chromeHeight = window.outerHeight - window.innerHeight;
        const chromeWidth = window.outerWidth - window.innerWidth;
        resizeTo(tableDiv.offsetWidth + chromeWidth, tableDiv.offsetHeight + chromeHeight);
      }
    });

    obs.sendRequest();
  });

  return (
    <div ref={tableDiv} class={sTable}>
      <Switch>
        <Match when={data()}>
          {(result) => <AttemptsComparisonTable last={result().last} referenceRecords={result().references} />}
        </Match>
        <Match when={true}>
          <p>No attempts yet.</p>
        </Match>
      </Switch>
    </div>
  );
});
