### PolyPath Flowchart Tool

#### TL;DR:


  1. `npm install` : Install angular dependencies.  
  2. `ng build` : compile angular app and bundle assets. Move to src/main/resources/public/static.
  3. Run spring boot app.
  4. Going to `localhost:8080` in a browser will return the generated index.html file that contains our angular app (the javascript files in the `<script>` tags.)
   
   Read below for more info. 

 #### Backend: 
 * Spring Boot
 * Spring Security
 * Spring Data JPA
 
 #### Frontend:
 * Angular2
 
 #### Database
 
 * PostgreSQL
 
 #### Continuous Integration
 
 * Travis-CI

 
 Angular project was generated with the Angular CLI.
 
 First, make sure you install all frontend dependencies using `npm install`.
 
 Run the development webpack server: `npm start`. This will run the webpack dev server at `localhost:4200`. It will watch all the source files and reload the app when it detects changes.

 `ng build` will be bundle the assets and place them at `src/main/resources/public/static`. This is defined in `.angular-cli.json`
  
 #### Deployment

Run the application with the maven plugin:
  `mvn spring-boot:run`. This will start the server at `localhost:8080` by default.
 
 The `ng build` task needs to be ran before the running the server. This will allow the server to provide the bundled client code.
 
 A maven plugin is used to run this run the npm tasks prior to the java build. `mvn spring-boot:run` will launch the spring boot app after running `ng build`.
  
 #### Development
  
 For development purposes, I recommend running the webpack dev server (`npm start`), in addition to running the spring boot server (`mvn spring-boot:run`). This will allow you to work on the angular code without needing to rebuild the java project. To access the app, you will use `localhost:4200`. 
 Normally when the angular app fetches data from the backend (i.e. `GET /courses`) it will use the host domain. Using the webpack dev server, this means it will attempt to make the API call to `localhost:4200/courses`. To fix this (since our API server is running at `localhost:8080`), we configure a proxy file to route all calls from `localhost:4200` to `localhost:8080`. 
   
   npm start: 
   ```"start": "ng serve --proxy-config proxy.config.json"```
   
   proxy.config.json:
   ```{
        "/": {
          "target": "http://localhost:8080",
          "secure": false
        }
      }
```

If you don't want to use the webpack server, remember that the angular app must be compiled, bundled, and copied to the resources directory of the spring boot app. 
This should automatically happen with the maven build due to the addition of the maven plugin `exec-maven-plugin`. It is set to run `npm install` in the `initialize` stage of the maven build and `npm run build` on the `compile` phase. This allows us the entire application to be built with maven.

Maven Lifecyle Reference: http://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html#Built-in_Lifecycle_Bindings

npm is kind of like maven for javascript projects. It stands for Node Package Manager. It reads a file called `package.json`, similar to how maven reads a pom.xml. `npm install` installs all defined dependecies in `package.json`. It also defines tasks in the `scripts` section of package.json. This is our scripts section:
  
```
"scripts": {
       "ng": "ng",
       "start": "ng serve --proxy-config proxy.config.json",
       "build": "ng build",
       "test": "ng test",
       "lint": "ng lint",
       "e2e": "ng e2e"
     },
```

This means `npm start` will run `ng serve --proxy-config.json` which starts the webpackdev server and tells angular to use our proxy file to route requests from localhost:4200 to localhost:8080.
