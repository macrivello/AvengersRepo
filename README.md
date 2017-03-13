Postman collection: https://www.getpostman.com/collections/58f033d960931c2d0c56  
Heroku app url: http://cp-avengers.herokuapp.com/
=======
#Cal Poly SLO Flowchart
Teamname: Avengers

This Spring Boot application is rebuilt and deployed on Heroku with every new commit to this branch.  
  
To build and run locally run the following command: 
./gradlew clean build && java -jar build/libs/gs-spring-boot-0.1.0.jar
or
mvn clean install && java -jar target/gs-spring-boot-0.1.0.jar

when running locally, then the app url is http://localhost:8080/
=======
Briefly list the purpose of your software system in a few short full sentences.

Our software will help students plan for classes by building their own custom and interactive flowchart. An administrative version will be available to help the department plan ahead to see which classes they should offer in future quarters.

##2.	List of features
In bullet points: give your proposed software system a name and list the 5-10 key features.

####Software System name: **POLY PATH**

* Simplify the process of creating flowcharts for administration
* Access Cal Poly's database for accurate quarters in which classes will be offered
  * If a catalogue change occurres then the flowchart will dynamically reflect changes
* Student's initial Path created depends upon:
  * Freshman user **or**
  * Transfer user
* Poly Path can easily intergrate minor into students Path
* Offers a suggested template, but has a customizable inferface
* Course Offering History 
* Planned academic calendar vs actual calendar 
* Change notifications if class availability changes

##3.	Requirements

Using this tool, a Cal Poly user can plan more efficiently for future classes. Its core functionality will be its live itegration with the Poly catalogue. Poly Path will update the users flowcharts according to: the catalogue requirements of that year, the users previous classes taken, and the various paths classes can be taken (technical electives and GEs offer a lot of variety). It will then generate an interactive flowchart, custom to that specific user, to help plan for future classes. 

##4.	Architecture

![High-level System Overview](https://drive.google.com/uc?export=view&id=0B9F1DNYCrDCHbjlBLXhYbGd6RnM)

##5.	Technologies

#### FrontEnd

* React.js

#### Backend

* Spring Boot

#### Database

* PostgreSQL

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