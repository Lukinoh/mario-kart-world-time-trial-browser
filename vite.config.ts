import { defineConfig } from "vite";
import devtools from "solid-devtools/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [devtools(), solidPlugin()],
  server: {
    port: 4440,
  },
  build: {
    target: "esnext",
  },
});
