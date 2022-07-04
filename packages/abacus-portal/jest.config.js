const { pathsToModuleNameMapper } = require("ts-jest")
const { compilerOptions } = require("./tsconfig.json")

module.exports = {
  displayName: "abacus-portal",
  collectCoverageFrom: [
    "components/**/*.{ts,tsx}",
    "!components/**/index.{ts,tsx}",
    "!**/models/**",
    // 'pages/**/*.{ts,tsx}'
  ],
  rootDir: "../../",
  moduleNameMapper: {
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/tests/__mocks__/file-mock.js`,
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: "<rootDir>/packages/abacus-portal/src/",
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
    "<rootDir>/packages/abacus-portal/**/?(*.)+(spec|test).(ts|js)?(x)",
  ],
  testEnvironment: "jsdom",
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
  globals: {
    // we must specify a custom tsconfig for tests because we need the typescript transform
    // to transform jsx into js rather than leaving it jsx such as the next build requires.  you
    // can see this setting in tsconfig.jest.json -> "jsx": "react"
    "ts-jest": {
      tsconfig: "<rootDir>/packages/abacus-portal/tsconfig.jest.json",
    },
    diagnostics: false,
  },
}
