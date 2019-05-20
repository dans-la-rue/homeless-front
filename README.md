# HomelessFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## Step 1. Prerequisites.

You need to set up your development environment before you can do anything.

Install [Node.js and npm](https://nodejs.org/en/download/) if they are not already on your machine.

> Verify that you are running at least Node.js version 8.x or greater and npm version 5.x or greater by running node -v and npm -v in a terminal/console window. Older versions produce errors, but newer versions are fine.

## Step 2. Create a new project based on this Repo.

Clone this repo into new project folder (e.g., my-proj).

```
git clone https://githubifc.iad.ca.inet/glahaie/parent-pas.git  my-proj
cd my-proj
```
## Step 3. Install npm packages

Install the npm packages described in the package.json and verify that it works:

```
npm install
ng serve --open
```

The `ng serve` command launches the server, watches your files, and rebuilds the app as you make changes to those files.

> If ng cmd is not recognize angular/cli might not be installed. To do so, npm install -g @angular/cli.


Using the --open (or just -o) option will automatically open your browser on `http://localhost:4200/`.

# The project structure

Here is the current structure of the angular app:
```
|-- app
    |-- Core
       |-- [+] Components
       |-- core.module.ts
    |
    |-- Modules
       |-- Client
          |-- [+] Components
          |-- [+] pages
          |-- client-routing.module.ts
          |-- client.module.ts
    |-- Shared
          |-- [+] Components
          |-- [+] Directives
          |-- [+] Pipes
          |-- [+] ...
|-- assets
    |-- fonts
    |-- images
    |-- scss
```

## The Core Module

The CoreModule takes on the role of the root AppModule , but is not the module which gets bootstrapped by Angular at run-time. The CoreModule should contain singleton services (which is usually the case), universal components and other features where there’s only once instance per application.

## The Shared Module

The SharedModule is where any shared components, pipes/filters and services should go. The SharedModule can be imported in any other module when those items will be re-used. The shared module shouldn’t have any dependency to the rest of the application and should therefore not rely on any other module.


