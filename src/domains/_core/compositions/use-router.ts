import * as v from "valibot";
import {
  type HashRouterProps,
  type RouterProps as HistoryRouterProps,
  HashRouter as hashRouter,
  Router as historyRouter,
} from "@solidjs/router";
import { BaseUrlSchema } from "../schemas/base-url";
import type { JSX } from "solid-js";

type RouterProps = Omit<HashRouterProps & HistoryRouterProps, "base">;

interface UseRouter {
  Router: (props: RouterProps) => JSX.Element;
  /**
   * @param path No leading slash
   */
  getUrl: (path: string) => string;
}

const baseUrl = v.parse(BaseUrlSchema, import.meta.env.BASE_URL);
const routerBaseUrl = baseUrl.slice(0, -1);
const isFile = location.protocol === "file:";

const File: UseRouter = {
  Router: (props: RouterProps) => hashRouter({ ...props }),
  getUrl: (path: string) => {
    const url = new URL(location.href);
    url.hash = `/${path}`;
    return url.toString();
  },
};

const History: UseRouter = {
  Router: (props: RouterProps) => historyRouter({ ...props, base: routerBaseUrl }),
  getUrl: (path: string) => {
    const url = new URL(location.href);
    url.pathname = `${baseUrl}${path}`;
    return url.toString();
  },
};

export function useRouter(): UseRouter {
  if (isFile) {
    return File;
  }
  return History;
}
