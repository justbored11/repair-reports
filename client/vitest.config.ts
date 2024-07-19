import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.test.tsx", "**/*.test.ts"],
    globals: true,
    environment: "jsdom",
    setupFiles: "tests/setup.ts",
    coverage: {
      reporter: ["text", "json", "html"],
      provider: "v8",
    },
  },
});
