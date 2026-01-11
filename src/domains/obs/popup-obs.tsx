import { type Component, Match, Switch, createMemo, createSignal, onMount } from "solid-js";
import { type ObsResponse, useObs } from "./compositions/use-obs";
import { AttemptsComparisonTable } from "../attempt/components/attempts-comparison-table/attempts-comparison-table";
import { css } from "@emotion/css";

const sOuterTable = css({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: "100%",
});

const sTable = css({
  width: "fit-content",
});

export const PopupObs: Component = () => {
  // oxlint-disable-next-line init-declarations no-unassigned-vars
  let tableDiv!: HTMLDivElement;
  // oxlint-disable-next-line init-declarations no-unassigned-vars
  let outerTableDiv!: HTMLDivElement;

  const obs = useObs();
  const [data, setData] = createSignal<ObsResponse["data"]>();
  const [scale, setScale] = createSignal(1);

  const calculateScale = (): void => {
    const scale = outerTableDiv.offsetWidth / tableDiv.offsetWidth;
    setScale(scale);
  };

  const sScale = createMemo(() =>
    css({
      transform: `scale(${scale()}, ${scale()})`,
      transformOrigin: "top left",
    }),
  );

  onMount(() => {
    document.title = `${document.title} OBS`;
    obs.onMessage((message) => {
      if (message.type === "response") {
        setData(message.data);
        calculateScale();
      }
    });

    window.addEventListener("resize", () => {
      calculateScale();
    });

    obs.sendRequest();
  });

  return (
    <div ref={outerTableDiv} class={sOuterTable}>
      <div ref={tableDiv} class={css(sTable, sScale())}>
        <Switch>
          <Match when={data()}>
            {(result) => <AttemptsComparisonTable last={result().last} referenceRecords={result().references} />}
          </Match>
          <Match when={true}>
            <p>No attempts yet.</p>
          </Match>
        </Switch>
      </div>
    </div>
  );
};
