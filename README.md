#Cal Poly SLO Flowchart
Teamname: Avengers

##1. Description

Briefly list the purpose of your software system in a few short full sentences.

Our software will help students plan for classes by building their own custom and interactive flowchart. An administrative version will be available to help the department plan ahead to see which classes they should offer in future quarters.

##2.	List of features
In bullet points: give your proposed software system a name and list the 5-10 key features.

####Software System name: **POLY PATH**

* Simplify the process of creating flowcharts for administration
* Access Cal Poly's database for accurate quarters in which classes will be offered
  * If a catalogue change occurres then the flowchart will dynamically reflect changes
* Student's initial Path created depends upon:
  * Freshman student **or**
  * Transfer student
* Poly Path can easily intergrate minor into students Path
* Offers a suggested template, but has a customizable inferface
* Course Offering History 
* Planned academic calendar vs actual calendar 
* Change notifications if class availability changes

##3.	Requirements

Using this tool, a Cal Poly student can plan more efficiently for future classes. Its core functionality will be its live itegration with the Poly catalogue. Poly Path will update the users flowcharts according to: the catalogue requirements of that year, the users previous classes taken, and the various paths classes can be taken (technical electives and GEs offer a lot of variety). It will then generate an interactive flowchart, custom to that specific user, to help plan for future classes. 

##4.	Architecture

![High-level System Overview](https://drive.google.com/uc?export=view&id=0B9F1DNYCrDCHbjlBLXhYbGd6RnM)

##5.	Technologies

#### FrontEnd

* Angular2

#### Backend

* Spring Boot

#### Database

* PostgreSQL

##6.	Project Breakdown, Timeline and Milestones

Estimate workload, define Milestones and a timeline when to complete implementation for the above listed requirements.

Week 1: Select tools and project

Week 2: Design project layout

Week 3: Create interactive flowchart
Week 4: Integrate Poly's Catalogue
Week 5: Creates a temporary template for classes that still need to be taken
Week 6: Integrate user's class history
Week 7: Flowchart editing tools that allow for custom class place holders
Week 8: Admin class tracking tool
Week 9: Have a notification element that notifies students of new changes to classes
Week 10: Have a working prototype for Poly Path

##7.	Risks and Uncertainties

List possible risks and other uncertainties which might delay or stop the proposed project.
