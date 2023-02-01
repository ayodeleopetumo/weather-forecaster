# Weather Forecaster!

The Weather Forecaster app is a simple Angular application that displays the current weather (and a 6 hour forecast when `View Forecast` for any of the cities is clicked) for 5 European cities (Amsterdam, Barcelona, Helsinki, Paris, Prague). The app makes use of the OpenWeather API to get weathers details.

**Image Credit:** [https://www.123rf.com/profile_gropgrop](https://www.123rf.com/profile_gropgrop)

**Jump To**
- [Getting Up and Running](#getting-up-and-running)
- [Architecture](#architecture)
- [Considerations](#considerations)
- [Opportunities for Improvement](#opportunities-for-improvement)


# Getting Up and Running

## Development server

- Download and unzip to a folder of your choice and change directories to the folder.
- Run `npm install` to install all necessary dependencies
- Run `ng serve` for a dev server.
- Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

StackEdit stores your files in your browser, which means all your files are automatically saved locally and are accessible **offline!**

# Architecture

## Folder Structure

The folder structure for the application here follows best practices. Here's an overview:


> **core**: This general
> - **enums**: This contains the enums the application makes use of. It currently contains only one file that lists the list of cities the application uses
> - **guards**: This folder contains the module import gaurd that checks and makes sure the Core module is imported only once.
> - **interceptors**: this contains the HTTP interceptor that intercepts and updates the loading state in the store for all http request.
> - **models**: This contains interfaces the app uses. This is to enforce the appropriate types for the application
> - **services**: This folder contains services that will be shared across the application and are meant to be Singletons (only one instance can exist). Providing it in `CoreModule` ensures that the services remain singleton
>- **store**: This folder contains the store for the app. This is a central location where data can be stored and retrieve by different components for easy data transfer across the app.

> **shared**: This folder contains general reusable components, services, etc. that is shared across different. modules. This can be imported by several modules.
> - **components**: This folder contains components that are not module-specific but are used by different components.
> - **layout**: This folder contains the layout components (header and footer) for the entire app to maintain a consisten look and feel.
> - **ui**: This contains a third-party UI module (Angular Material) that has gives the app a common theme and reusable components.

> **views**: This folder generally contains the pages that the user interacts with. The pages here consists of different components composed to form a usable page.
> - **forecast**: This page shows the weather forecast (in the next 6 hours) for chosen city (url: `/forecasts/:city`)
> - **home**: This is the app landing page and shows the user the weather forecasts for 5 European cities.
> - **page-not-found**: The is the catch-all page for when a user tries to navigate manually to a non-existent page. It shows the user a message and a button to navigate back to the home page.

> **assets**: This folder contains all the media assets (pictures) and general app styles
> **environments**: This contains environment variables that allow the app to have some configuration that can be changed centrally. E.g `apiURL` can be configured to a different url and it will have it picked up by the app.

## Considerations
- **Smart/dumb component approach:**
  -  The `pages`folder contained within the `views/{{folder}}` acts as the source of truth for the module. It retrieves data (from the store or api) to pass it down to child components that form the pages building block.
  - The `components`folder contained within the `views/{{folder}}`contains the building block for the page and acts as the dumb components. They receive data from the parent through the `@Input()` property decorator and sends (if needed) data back to parent through the `@Output()` property decorator.

- **Unidirectional data flow**: This is helps achieve the above.

- **Modular design**: The idea is to slice the application into **feature modules** representing different functionalities/use cases. This is yet another step to deconstruct the system into smaller pieces for better maintainability.

- **Observable store:**
  - The `store` folder contained within `core` contains a simplified store that makes use of Observables, leveraging it's reactive pattern to be able to act like a central storehouse for the application. Opted for this as against the other full blown options (NgRx, NgXs) because of their boilerplate template that those will add to an application as simple as that.

- **Lazy-loading:**
  > By default, NgModules are eagerly loaded, which means that as soon as the app loads, so do all the NgModules, whether or not they are immediately necessary. For large apps with lots of routes, consider lazy loading—a design pattern that loads NgModules as needed. Lazy loading helps keep initial bundle sizes smaller, which in turn helps decrease load times. - **Angular Doc**
  - As stated above by the Angular team, the use of routes makes lazy loading possible and helps with the initial app bundle as feature modules are loaded as needed. The makes the initial app loading experience faster.

- **Route resolvers:**
  - A route resolver used with the `forecast`module is invoked when the navigation starts. The router waits for the data to be resolved before the route is finally activated, which simply means that our data is available to us upon navigating.

- **404 (aka PageNotFound)**:
  - This simply acts as a catch-all route that makes responding to a 404 not found error possible by showing a user an easy to understand message and a way to find their way back.

- **API response caching**:
  - The app caches every API request in the store for a 10 minute (this is configurable, more on this later) interval. This allows for snappier data and app. This was considered a necessary approach as weather data does not change as often and does not need to be fetched every time.
  - The store cache is invalidated after the 10 minute interval which will force the app to retrieve fresh data after this.

  - The `refresh_interval`within the `environmens.ts` file controls the time limit for store invalidation.
  - This could have been easily achieved in GraphQL with the `fetchPolicy`, `pollInterval`, etc. without the need of the store.

## Opportunities for improvement
- The error component exists within two components (`home` and `forecast`). After an app audit, I noticed I could have had the error intercepted in the HTTP interceptor I setup for the loading component as well and handle the http error centrally.

- Would be nice to have all components with adequate unit tests but had to choose based on time constraints.
