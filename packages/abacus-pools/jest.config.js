const { pathsToModuleNameMapper } = require("ts-jest")
const { compilerOptions } = require("./tsconfig.json")

module.exports = {
  displayName: "abacus-pools",
  collectCoverageFrom: [
    "components/**/*.{ts,tsx}",
    "!components/**/index.{ts,tsx}",
    "!**/models/**",
    // 'pages/**/*.{ts,tsx}'
  ],
  rootDir: "../../",
  moduleNameMapper: {
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: "<rootDir>/packages/abacus-pools/src/",
    }),
  },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  setupFiles: ["<rootDir>/tests/loadershim.js"],
  testMatch: [
    "<rootDir>/packages/abacus-pools/**/?(*.)+(spec|test).(ts|js)?(x)",
  ],
  testEnvironment: "jsdom",
  transform: {
    "\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    // we must specify a custom tsconfig for tests because we need the typescript transform
    // to transform jsx into js rather than leaving it jsx such as the next build requires.  you
    // can see this setting in tsconfig.jest.json -> "jsx": "react"
    "ts-jest": {
      tsconfig: "<rootDir>/packages/abacus-pools/tsconfig.jest.json",
    },
    diagnostics: false,
  },
}
