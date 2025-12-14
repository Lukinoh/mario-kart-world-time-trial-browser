import config from "./vite.config";
import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  plugins: [...(config.plugins ?? [])],
  test: {
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      // https://vitest.dev/config/browser/playwright
      instances: [{ browser: "chromium" }],
      screenshotFailures: false,
    },
    chaiConfig: {
      truncateThreshold: 0,
    },
  },
});
