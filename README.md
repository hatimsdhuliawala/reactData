# Pipeline UI [![Build Status](https://drone6.target.com/api/badges/ContentPipeline/pipeline-ui/status.svg)](hhttps://drone6.target.com/ContentPipeline/pipeline-ui)
This app is built on [Praxis](https://praxis.target.com/). Praxis is Target's internally-developed kickstarter user interface.

## Application URL's (Kubernetes URL)
- Dev: https://dev-pipeline.target.com/v2   (https://pipeline-v2-dev.test.k8s.target.com)
- Stage: https://stg-pipeline.target.com/v2 (https://pipeline-v2-stg.prod.k8s.target.com)
- Prod: https://pipeline.target.com/v2      (https://pipeline-v2.prod.k8s.target.com)



## Local Development Setup
NOTE: Never use `sudo` when running any of the following commands.  Using `sudo` will cause file permission problems!

1. Install Node.js via [nvm](https://github.com/creationix/nvm) and the run the following commands:
    - `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash`
    - `nvm install [node version specified in the .nvmrc file]` (e.g. `nvm install v8.9.3`)

2. Install [Yarn](https://yarnpkg.com) globally for package management via:
  ```bash
  npm install -g yarn
  ```

3. Install the application packages via:
  ```bash
  yarn
  ```

## Troubleshooting Common Setup Issues
**Error**: `yarn` fails with something similar to the following: `unable to get local issuer certificate"`

**Resolution**: Run the following command: `yarn config set strict-ssl false`

## Running The Application
- `yarn start` Run app locally. Watches for file changes and reloads.

## NPM Scripts
- `yarn test` Run unit tests.
- `yarn test:coverage` Run unit tests and prints test coverage.
- `yarn lint` Lint JavaScript code.
- `yarn build` Build the app in production mode: output optimized HTML, CSS, JS, and images to `build/`.
- `yarn generate` Generate a new component or container with tests, as defined in `generators/`.

## Recommended Chrome Extensions
These extensions add new tabs the Chrome DevTools that are designed to make debugging easier.

- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) – Allows you to inspect React's VDOM and see what properties, state, and context each component is being rendered with.
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) – Allows you to inspect the current Redux state and move through the history of how the state changed.

## Upload Testing
- The port number has to be updated to 8080
- Change the port number in scripts/start.js (const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000)
- Or you can run command (sudo PORT=8080 yarn start)

## Disable CORS on Local Environment
- to disable the option calls - open -a Google\ chrome --args --disable-web-security --user-data-dir
- NOTE: Close the Chrome browser before running the command

## Structure
`src/` contains the app code.

`build/` contains optimized, production-ready code.

## Access Permission
`src/store/auth/index.js` contains the permission code for users permission.

## Browser Support
This app supports the latest versions of Internet Explorer, Chrome, Safari, Firefox, and Edge.

## Credits
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).  See the full `create-react-app` guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
