const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  displayName: "abacus-components",
  rootDir: "../../",
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: "<rootDir>/packages/abacus-components/src/",
    }),
  },
  testEnvironment: "jsdom",
  testMatch: [
    "<rootDir>/packages/abacus-components/**/?(*.)+(spec|test).(ts|js)?(x)",
  ],
  transform: {
    "\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    // we must specify a custom tsconfig for tests because we need the typescript transform
    // to transform jsx into js rather than leaving it jsx such as the next build requires.  you
    // can see this setting in tsconfig.jest.json -> "jsx": "react"
    "ts-jest": {
      tsconfig: "<rootDir>/packages/abacus-components/tsconfig.jest.json",
    },
    diagnostics: false,
  },
};
