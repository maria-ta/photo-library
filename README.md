# PhotoLibrary

PhotoLibrary test app which demonstrates work with Unsplash API or emulates it.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0.

## BE (optional)

In order to use real Unsplash API, set up the [BE server](https://github.com/maria-ta/photo-library-be). The server will provide config for the app (Unsplash app name) and will act as a proxy to Unsplash API (as it requires an access key to use it).

It is possible to run the app without the BE server. In that case work with API will be emulated with mock data and images from assets. Same photos can appear multiple times on Photos page.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Run `npm run test:watch` to execute the unit tests in a watch mode.
Run `npm run test:coverage` to execute the unit tests and get the information about code coverage.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
