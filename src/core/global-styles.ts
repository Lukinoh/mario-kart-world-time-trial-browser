import { injectGlobal } from "@emotion/css";

injectGlobal({
  ":root": {
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
