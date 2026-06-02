import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["packages/**/*.{test,spec}.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["packages/**/*.ts"],
      exclude: ["packages/**/src/index.ts", "packages/**/*.{test,spec}.ts"],
    },
  },
});
