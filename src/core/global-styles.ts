import { injectGlobal } from "@emotion/css";

injectGlobal({
  ":root": {
    // For dark theme of simplecss
    "color-scheme": "dark",
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
    "--mk-spacing-medium": "0.5rem",
    "--mk-spacing-large": "1rem",
    "--mk-border": "var(--border-width) solid var(--border)",
  },
  body: {
    gridTemplateColumns: "1fr 90% 1fr",
  },
  video: {
    // Otherwise, the text "Capture Video" is slightly visible.
    opacity: 1,
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
