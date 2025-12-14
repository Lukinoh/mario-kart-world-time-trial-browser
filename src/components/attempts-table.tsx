import { For, createMemo } from "solid-js";
import type { Attempt } from "../core/domain/types/attempt";
import { css } from "@emotion/css";
import { defineComponent } from "../tools/utils";
import { format } from "date-and-time";

const sTextAlignCenter = css({
  textAlign: "center",
});

interface AttemptsTableProps {
  attempts: Array<Attempt>;
}

export const AttemptsTable = defineComponent<AttemptsTableProps>((props) => {
  const laps = createMemo(() =>
    Array.from({ length: Math.max(...props.attempts.map((attempt) => attempt.laps)) }, (_v, index) => index + 1),
  );

  return (
    <table>
      <thead>
        <tr>
          <th rowspan="2" class={sTextAlignCenter}>
            Date
          </th>
          <th rowspan="2" class={sTextAlignCenter}>
            Player
          </th>
          <th rowspan="2" class={sTextAlignCenter}>
            Map
          </th>
          <th colspan="2" class={sTextAlignCenter}>
            Total
          </th>
          <For each={laps()}>
            {(_, index) => <th colspan="3" class={sTextAlignCenter}>{`Split ${index() + 1}`}</th>}
          </For>
        </tr>
        <tr>
          <th rowSpan="2" class={sTextAlignCenter}>
            Time
          </th>
          <th rowSpan="2" class={sTextAlignCenter}>
            Coins
          </th>
          <For each={laps()}>
            {() => (
              <>
                <th class={sTextAlignCenter}>{`Time`}</th>
                <th class={sTextAlignCenter}>{`Shrooms`}</th>
                <th class={sTextAlignCenter}>{`Coins`}</th>
              </>
            )}
          </For>
        </tr>
      </thead>

      <tbody>
        <For each={props.attempts}>
          {(attempt) => (
            <tr>
              <td class={sTextAlignCenter}>{format(new Date(attempt.timestamp), "YYYY.MM.DD | HH:mm:ss")}</td>
              <td>{attempt.player}</td>
              <td>{attempt.track}</td>
              <td class={sTextAlignCenter}>{attempt.time ?? "-"}</td>
              <td class={sTextAlignCenter}>{attempt.coins ?? "-"}</td>
              <For each={laps()}>
                {(_, index) => (
                  <>
                    <td class={sTextAlignCenter}>{attempt.splits.at(index())?.time ?? "-"}</td>
                    <td class={sTextAlignCenter}>{attempt.splits.at(index())?.shrooms ?? "-"}</td>
                    <td class={sTextAlignCenter}>{attempt.splits.at(index())?.coins ?? "-"}</td>
                  </>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
});
