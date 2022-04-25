import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";

const packageJson = require("./package.json");

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "es",
      exports: "named",
      sourcemap: true,
    },
  ],
  external: [
    ...Object.keys(packageJson.peerDependencies || {}),
    ...Object.keys(packageJson.dependencies || {}),
  ],
  plugins: [
    peerDepsExternal(),
    typescript({
      typescript: require("typescript"),
      tsconfigOverride: {
        exclude: ["**/*.test.tsx", "**/*.config.js", "**/*.stories.*", "lib"],
      },
      rollupCommonJSResolveHack: false,
      clean: true,
    }),
  ],
};
