require("dotenv").config();

module.exports = {
  schema: process.env.GRAPH_API,
  documents: ["./**/*.graphql"],
  generates: {
    "./index.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
      config: {
        withHooks: true,
        scalars: {
          BigInt: "string",
          BigDecimal: "string",
        },
      },
    },
  },
};
