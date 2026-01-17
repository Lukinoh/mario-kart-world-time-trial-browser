import "simpledotcss/simple.min.css";
import { injectGlobal } from "@emotion/css";

export const injectGlobalStyles = (): void => {
  injectGlobal({
    ":root": {
      // For dark theme of simplecss
      colorScheme: "dark",
      "--bg": "#212121",
      "--accent-bg": "#2b2b2b",
      "--text": "#dcdcdc",
      "--text-light": "#ababab",
      "--accent": "#ffb300",
      "--accent-hover": "#ffe099",
      "--accent-text": "var(--bg)",
      "--code": "#f06292",
      "--preformatted": "#ccc",
      "--disabled": "#111",

      // Custom css variables
      "--mk-spacing-small": "0.25rem",
      "--mk-spacing-medium": "0.5rem",
      "--mk-spacing-large": "1rem",
      "--mk-border": "var(--border-width) solid var(--border)",

      // F1Cell and DeltaCell
      "--mk-f1-purple": "#b224b8",
      "--mk-f1-green": "#2ac92d",
      "--mk-f1-yellow": "#eaed79",
      "--mk-delta-blue": "#0498fe",
      "--mk-delta-blue-border": "#023d69",
      "--mk-delta-red": "#ff5a04",
      "--mk-delta-red-border": "#950000",
      "--mk-delta-neutral": "#808080",
      "--mk-delta-stroke-width": "0.03rem",
    },
    html: {
      scrollbarGutter: "stable",
    },
    body: {
      gridTemplateColumns: "1fr minmax(0, 80rem) 1fr !important",
      columnGap: "var(--mk-spacing-medium)",
    },
    video: {
      // Otherwise, the text "Capture Video" is slightly visible.
      opacity: "1 !important",
    },
    canvas: {
      borderRadius: "var(--standard-border-radius)",
      objectFit: "contain",
      overflowClipMargin: "content-box",
      overflow: "clip",
      maxWidth: "100%",
      height: "auto",
    },
    dialog: {
      maxWidth: "80%",
    },
  });
};
