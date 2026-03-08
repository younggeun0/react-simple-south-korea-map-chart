import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/components/index.ts"],
  format: ["cjs", "esm"],
  outDir: "dist",
  bundle: true,
  injectStyle: true,
  clean: true,
  dts: true,
  sourcemap: true,
  external: ["react", "react-dom"],
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".mjs"
    };
  }
});
