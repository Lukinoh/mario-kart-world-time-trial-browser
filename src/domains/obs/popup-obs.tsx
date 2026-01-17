import { type Component, Match, Switch, createEffect, createMemo, createSignal, on, onMount } from "solid-js";
import { VerticalAttemptsComparisonTable } from "../attempt/components/attempts-comparison-table/vertical-attempts-comparison-table";
import { css } from "@emotion/css";
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
  // oxlint-disable-next-line init-declarations no-unassigned-vars
  let tableDiv!: HTMLDivElement;
  // oxlint-disable-next-line init-declarations no-unassigned-vars
  let outerTableDiv!: HTMLDivElement;

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
                referenceRecords={result().references}
                sumTimeRecords={result().sumTimeRecords}
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
