# Firefly Services Challenge

This repository holds a sample React Spectrum and Express application used to showcase Adobe Firefly Services capabilities. The server component hosts an API and a UI layer that provides a mechanism to interact with remote APIs.

## Prerequisites
* [Node JS](https://nodejs.org/) (current target 16.x)
    * Node Package Manager (NPM) (included with Node JS, current target 8.x)
* Integrated Development Environment (IDE)
    * *(Recommended)* [Visual Studio Code](https://code.visualstudio.com/)
        * (Recommended Extension) [GIT Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)
* [GIT SCM](https://git-scm.com/)

## Getting Started

Get started by running `npm install`

### Build and Run
The build scripts included in this project support both `ui` and `server` modularity. Append a `:ui` or `:server` suffix to the following build scripts to target specific modules.

Run `npm run dev` to start the UI and Server components for local development

Run `npm run test` to run unit tests for the UI and Server

Run `npm run test:e2e` to run integration tests (requires a running server)

Run `npm run build` to build the project

### Testing

For local API testing, a POSTMan collection is also included [here](<docs/Firefly Services Challenge.postman_collection.json>).

## Documentation

* Adobe Firefly Services: https://developer.adobe.com/firefly-services/docs/guides/

### New Issues

New issues can logged here: https://github.com/GuillaumeCleme/firefly-services-challenge/issues

## Collaborators
* Guillaume Clement <<guillaumecle.me@gmail.com>>

## License
* ISC: https://opensource.org/license/isc-license-txt
