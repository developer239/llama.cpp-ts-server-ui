# llama.cpp-ts Server & UI

## Development

This project uses Turborepo for build system management. You can find more information by [reading the Turborepo documentation](https://turborepo.org/docs).

### Setting up

- Run `yarn install` to install dependencies. This project uses Yarn workspaces to manage dependencies across all apps and packages.
- Run `yarn prepare:husky` to set up Git hooks.
- Run `yarn build` to build all packages and service (remember that packages are static and required to run the app services)
- Run `yarn dev` to start all services in development mode

### Common Commands

- `yarn build` - Builds all services.
- `yarn lint` - Lints the codebase using ESLint.
- `yarn format` - Formats code using Prettier.
