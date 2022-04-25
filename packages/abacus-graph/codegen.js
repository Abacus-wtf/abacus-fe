require("dotenv").config();

module.exports = {
  schema: process.env.GRAPH_API,
  documents: ["./src/**/*.graphql"],
  generates: {
    "./src/index.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
      config: {
        withHooks: true,
        scalars: {
          BigInt: "TheGraph_BigInt",
          BigDecimal: "TheGraph_BigDecimal",
        },
      },
    },
  },
};
