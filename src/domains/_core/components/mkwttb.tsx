import type { Component } from "solid-js";
import { css } from "@emotion/css";

const sMkwttb = css({
  color: "darkorange",
  fontFamily: "var(--mono-font)",
  fontWeight: "bold",
});

export const Mkwttb: Component = () => {
  return <span class={sMkwttb}>mkwttb</span>;
};
