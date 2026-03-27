import { type Component, Match, Switch, createEffect, createMemo, createSignal, on, onMount } from "solid-js";
import { VerticalAttemptsComparisonTable } from "../attempt/components/attempts-comparison-table/vertical-attempts-comparison-table";
import { css } from "@emotion/css";
import { omit } from "remeda";
import { useObsListener } from "./compositions/use-obs-listener";

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
  let tableDiv!: HTMLDivElement; // oxlint-disable-line init-declarations no-unassigned-vars
  let outerTableDiv!: HTMLDivElement; // oxlint-disable-line init-declarations no-unassigned-vars

  const { data } = useObsListener();
  const [scale, setScale] = createSignal(1);
  const sScale = createMemo(() =>
    css({
      transform: `scale(${scale()}, ${scale()})`,
      transformOrigin: "top left",
    }),
  );

  onMount(() => {
    document.title = `${document.title} OBS`;
    window.addEventListener("resize", () => {
      calculateScale();
    });
  });

  createEffect(
    on(data, () => {
      calculateScale();
    }),
  );

  const calculateScale = (): void => {
    // +3 is for preventing bottom scrollbar due to precision.
    const scale = outerTableDiv.offsetWidth / (tableDiv.offsetWidth + 3);
    setScale(scale);
  };

  return (
    <div ref={outerTableDiv} class={`popup-obs ${sOuterTable}`}>
      <div ref={tableDiv} class={css(sTable, sScale())}>
        <Switch>
          <Match when={data()}>
            {(result) => (
              <VerticalAttemptsComparisonTable
                last={result().last}
                referenceRecords={omit(result().references, ["FR"])}
                timeRecordsSum={result().timeRecordsSum}
              />
            )}
          </Match>
          <Match when={true}>
            <p>No attempts yet.</p>
          </Match>
        </Switch>
      </div>
    </div>
  );
};
