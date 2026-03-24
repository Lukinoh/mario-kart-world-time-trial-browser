import { type Component, onMount } from "solid-js";
import { AttemptsTable } from "../domains/attempt/components/attempts-table";
import { useAttemptsFilter } from "../domains/attempt/components/attempts-filter/use-attempts-filter";
import { usePageTitle } from "./compositions/use-page-title";
import { usePersonalRepository } from "../domains/database/compositions/use-personal-repository";

export const Result: Component = () => {
  const personal = usePersonalRepository();
  const { setTitle } = usePageTitle();
  const { filtered, AttemptsFilter } = useAttemptsFilter({
    input: {
      timeRecords: personal.getTimeRecords,
      splitRecords: personal.getSplitRecords,
    },
  });

  onMount(() => {
    setTitle("Result");
  });

  return (
    <>
      <AttemptsFilter />
      <h2>Personal best</h2>
      <AttemptsTable attempts={filtered().timeRecords} />
      <h2>Best personal splits</h2>
      <AttemptsTable attempts={filtered().splitRecords} />
    </>
  );
};
