import { type Accessor, For, type JSX, createMemo } from "solid-js";
import type { AttemptStorage } from "../../core/domain/types/attempt-storage";
import type { SplitStorage } from "../../core/domain/types/split-storage";
import { defineComponent } from "../../core/helpers/solid-js";
import { format } from "date-and-time";
import { generateArray } from "../../core/helpers/generate-array";

interface FormattedAttempt {
  date: string;
  datetime: string;
  player: string;
  track: string;
  time?: string;
  coins?: number;
  laps: Array<number>;
  gridRows: number;
  splits: Array<SplitStorage>;
}

interface ForAttemptsProps {
  each: Array<AttemptStorage>;
  children: (item: Accessor<FormattedAttempt>, index: Accessor<number>) => JSX.Element;
}

const rows = (attempt: AttemptStorage): number => {
  return attempt.laps + attempt.laps - 1;
};

export const ForAttempts = defineComponent<ForAttemptsProps>((props) => {
  const formatAttempt = (attempt: AttemptStorage): Accessor<FormattedAttempt> => {
    return createMemo(() => {
      const date = format(new Date(attempt.timestamp), "YYYY.MM.DD");
      const datetime = format(new Date(attempt.timestamp), "HH:mm:ss");

      return {
        date: date,
        datetime: datetime,
        player: attempt.player,
        track: attempt.track,
        time: attempt.time,
        coins: attempt.coins,
        laps: generateArray(attempt.laps),
        gridRows: rows(attempt),
        splits: attempt.splits,
      };
    });
  };

  return <For each={props.each}>{(attempt, index) => props.children(formatAttempt(attempt), index)}</For>;
});
