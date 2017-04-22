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

* Angular2

#### Backend

* Spring Boot

#### Database

* PostgreSQL

#### Continuous Integration

* Travis-CI

##6.	Project Breakdown, Timeline and Milestones

Estimate workload, define Milestones and a timeline when to complete implementation for the above listed requirements.

Week 1: Select tools and project <br />
Week 2: Design project layout <br />
Week 3: Create interactive flowchart <br />
Week 4: Integrate Poly's Catalogue <br />
Week 5: Creates a temporary template for classes that still need to be taken <br />
Week 6: Integrate user's class history <br />
Week 7: Flowchart editing tools that allow for custom class place holders <br />
Week 8: Admin class tracking tool <br />
Week 9: Have a notification element that notifies students of new changes to classes <br />
Week 10: Have a working prototype for Poly Path <br />

##7.	Risks and Uncertainties

List possible risks and other uncertainties which might delay or stop the proposed project.

- The scope of the project could lead to integration issues with Cal Poly's server
- The time frame in producing a working product at the end of next quarter could cause the feature list to be made more realistic
- Lack of experience developing a whole software system and using these tools will come along with a learning curve of its own