import { MINUS, PLUS, PLUS_OR_MINUS } from "../characters";
import type { Attempt } from "../domain/local/attempt";
import { Time } from "../../recognitions/time/time";
import { isDefined } from "remeda";

export function delta(
  attempt2: Attempt,
  attempt1: Attempt,
  sIndex: number,
  type: "time" | "accumulatedTime",
): string | undefined {
  const attemptTime2 = attempt2.splits.at(sIndex)?.[type];
  const attemptTime1 = attempt1.splits.at(sIndex)?.[type];

  if (isDefined(attemptTime2) && isDefined(attemptTime1)) {
    const difference = attemptTime2 - attemptTime1;
    const sign = Math.sign(difference);
    const value = Math.abs(difference);

    let signCharacter = PLUS_OR_MINUS;

    if (sign < 0) {
      signCharacter = MINUS;
    }

    if (sign > 0) {
      signCharacter = PLUS;
    }

    return signCharacter + Time.format(value);
  }
}
