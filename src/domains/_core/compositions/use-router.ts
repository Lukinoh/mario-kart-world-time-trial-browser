import {
  type HashRouterProps,
  type RouterProps as HistoryRouterProps,
  HashRouter as hashRouter,
} from "@solidjs/router";
import type { JSX } from "solid-js";

type RouterProps = Omit<HashRouterProps & HistoryRouterProps, "base">;

interface UseRouter {
  Router: (props: RouterProps) => JSX.Element;
  /**
   * @param path No leading slash
   */
  getUrl: (path: string) => string;
}

const isFile = location.protocol === "file:";

const File: UseRouter = {
  Router: (props: RouterProps) => hashRouter({ ...props }),
  getUrl: (path: string) => {
    const url = new URL(location.href);
    url.hash = `/${path}`;
    return url.toString();
  },
};

// Currently, GitHub pages does not support SPA... so we cannot use the History router.
// import * as v from "valibot";
// import { Router as historyRouter } from "@solidjs/router";
// import { BaseUrlSchema } from "../schemas/base-url";
// const baseUrl = v.parse(BaseUrlSchema, import.meta.env.BASE_URL);
// const routerBaseUrl = baseUrl.slice(0, -1);
// const Web: UseRouter = {
//   Router: (props: RouterProps) => historyRouter({ ...props, base: routerBaseUrl }),
//   getUrl: (path: string) => {
//     const url = new URL(location.href);
//     url.pathname = `${baseUrl}${path}`;
//     return url.toString();
//   },
// };

const Web: UseRouter = File;

export function useRouter(): UseRouter {
  if (isFile) {
    return File;
  }
  return Web;
}
