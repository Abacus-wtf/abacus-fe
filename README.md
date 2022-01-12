## Getting Started

This Monorepo uses [lerna](https://lerna.js.org/) to manage packages.

### Install

Bootstrap the packages in the current Lerna repo. Installing all their dependencies and linking any cross-dependencies.

This command is crucial, as it allows you to use your package names in require() as if the packages were already existing and available in your node_modules folder.

```
yarn lerna bootstrap
```

### Run

The following command will run all packages in parallel

```
yarn dev
```
