import type { Brand } from "../../domains/_core/utils/brand";
import { createSignal } from "solid-js";
import { createSingletonRoot } from "../../domains/_core/utils/solid-js";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function usePageTitleSingleton() {
  const [title, setTitle] = createSignal("Nothing yet");

  return {
    title,
    setTitle,
  };
}

type PageTitle = Brand<ReturnType<typeof usePageTitleSingleton>>;
export const usePageTitle = createSingletonRoot<PageTitle>(usePageTitleSingleton);
