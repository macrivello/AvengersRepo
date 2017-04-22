### PolyPath Flowchart Tool

####Backend: 
 + Spring Boot
 + Spring Security
 + Spring Data
 + Postgres
 
 Run the application with the maven plugin:
  `mvn spring-boot:run`. This will start the server at `localhost:8080` by default.
 
 ####Frontend:
 + Angular2
 
 Generated with the Angular CLI.
 
 Run the development webpack server: `ng serve`. This will run the webpack dev server at `localhost:4200`

 `ng build` will be bundle the assets and place at `src/main/resources/public/static`.
  
 ####Deployment

 The `ng build` task needs to be ran before the running the server. This will allow the server to provide the bundled client code.
 
 A maven plugin is used to run this run the npm tasks prior to the java build. `mvn spring-boot:run` will launch the spring boot app after running `ng build`.
  
  
 // TODO describe the proxy.config file, npm commands, maven plugin, heroku build, spring dev tools
