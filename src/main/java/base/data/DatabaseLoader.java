package base.data;

import base.course.Course;
import base.course.CourseService;
import base.department.Department;
import base.department.DepartmentService;
import base.entry.EntryService;
import base.flowchart.FlowchartService;
import base.quarter.Quarter;
import base.quarter.QuarterService;
import base.quarter.Term;
import base.security.user.RoleType;
import base.user.User;
import base.user.UserService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class DatabaseLoader implements CommandLineRunner {

    @Autowired
    private CourseService courseService;
    @Autowired
    private DepartmentService departmentService;
    @Autowired
    private EntryService entryService;
    @Autowired
    private FlowchartService flowchartService;
    @Autowired
    private QuarterService quarterService;
    @Autowired
    private UserService userService;

    @Override
    public void run(String... args) throws Exception {

      ObjectMapper objectMapper = new ObjectMapper();
      List<CatalogCourse> catalogCourseList = objectMapper.readValue(ResourceUtils.getURL("src/main/resources/data/courses.json").openStream(), new TypeReference<List<CatalogCourse>>(){});

      for (CatalogCourse catalogCourse : catalogCourseList){
        //check if department exists, if not create it
        Department dept = departmentService.getDepartmentByName(catalogCourse.getPrefix());
        if (dept == null) {
          dept = new Department(catalogCourse.getPrefix());
          departmentService.addDepartment(dept);
        }
        //add course to list
        courseService.addCourse(new Course(catalogCourse.getSuffix(), catalogCourse.getTitle(), catalogCourse.getDescription(), dept));
      }

      Department department = new Department("GE");
      departmentService.addDepartment(department);
      courseService.addCourse(new Course("A1", "General Education A1", "", department));
      courseService.addCourse(new Course("A2", "General Education A2", "", department));
      courseService.addCourse(new Course("A3", "General Education A3", "", department));

      courseService.addCourse(new Course("B1", "General Education B1", "", department));
      courseService.addCourse(new Course("B2", "General Education B2", "", department));
      courseService.addCourse(new Course("B3", "General Education B3", "", department));
      courseService.addCourse(new Course("B4", "General Education B4", "", department));
      courseService.addCourse(new Course("B5", "General Education B5", "", department));
      courseService.addCourse(new Course("B6", "General Education B6", "", department));

      courseService.addCourse(new Course("C1", "General Education C1", "", department));
      courseService.addCourse(new Course("C2", "General Education C2", "", department));
      courseService.addCourse(new Course("C3", "General Education C3", "", department));
      courseService.addCourse(new Course("C4", "General Education C4", "", department));
      courseService.addCourse(new Course("C5", "General Education C5", "", department));

      courseService.addCourse(new Course("D1", "General Education D1", "", department));
      courseService.addCourse(new Course("D2", "General Education D2", "", department));
      courseService.addCourse(new Course("D3", "General Education D3", "", department));
      courseService.addCourse(new Course("D4", "General Education D4", "", department));
      courseService.addCourse(new Course("D5", "General Education D5", "", department));

      department = new Department("TECH");
      departmentService.addDepartment(department);
      courseService.addCourse(new Course("", "Technical Elective", "", department));


      // Add Quarters
        ArrayList<Quarter> testQuarters = new ArrayList<>();
        testQuarters.add(new Quarter(Term.FALL, 2016));
        testQuarters.add(new Quarter(Term.WINTER, 2017));
        testQuarters.add(new Quarter(Term.SPRING, 2017));
//        testQuarters.add(new Quarter(Term.SUMMER, 2017));
        testQuarters.add(new Quarter(Term.FALL, 2017));
        testQuarters.add(new Quarter(Term.WINTER, 2018));
        testQuarters.add(new Quarter(Term.SPRING, 2018));
//        testQuarters.add(new Quarter(Term.SUMMER, 2018));
        testQuarters.add(new Quarter(Term.FALL, 2018));
        testQuarters.add(new Quarter(Term.WINTER, 2019));
        testQuarters.add(new Quarter(Term.SPRING, 2019));
//        testQuarters.add(new Quarter(Term.SUMMER, 2019));
        testQuarters.add(new Quarter(Term.FALL, 2019));
        testQuarters.add(new Quarter(Term.WINTER, 2020));
        testQuarters.add(new Quarter(Term.SPRING, 2020));
//        testQuarters.add(new Quarter(Term.SUMMER, 2020));
        testQuarters.add(new Quarter(Term.FALL, 2020));
        testQuarters.add(new Quarter(Term.WINTER, 2021));
        testQuarters.add(new Quarter(Term.SPRING, 2021));
//        testQuarters.add(new Quarter(Term.SUMMER, 2021));
        testQuarters.add(new Quarter(Term.FALL, 2021));
        testQuarters.add(new Quarter(Term.WINTER, 2022));
        testQuarters.add(new Quarter(Term.SPRING, 2022));
//        testQuarters.add(new Quarter(Term.SUMMER, 2022));
        testQuarters.add(new Quarter(Term.FALL, 2022));
        testQuarters.add(new Quarter(Term.WINTER, 2023));
        testQuarters.add(new Quarter(Term.SPRING, 2023));
//        testQuarters.add(new Quarter(Term.SUMMER, 2023));
        testQuarters.add(new Quarter(Term.FALL, 2023));
        testQuarters.add(new Quarter(Term.WINTER, 2024));
        testQuarters.add(new Quarter(Term.SPRING, 2024));
//        testQuarters.add(new Quarter(Term.SUMMER, 2024));
        testQuarters.forEach(quarter -> quarterService.addQuarter(quarter));

        Quarter startQuarter = quarterService.getStartOfCurrentYear();
        Quarter endQuarter = quarterService.nextQuarter(startQuarter, 4 * 4);

        // Add users
        ArrayList<User> testUsers = new ArrayList<>();
        testUsers.add(new User("Gudrun", "Socher", "gsocher@calpoly.edu", "password"));
        testUsers.add(new User("Michael", "Crivello", "macrivel@calpoly.edu", "password1"));
        testUsers.add(new User("Jonathan", "Pautz", "jpautz@calpoly.edu", "password2"));
        testUsers.add(new User("Matt", "Jimenez", "mpjimene@calpoly.edu", "password3"));
        testUsers.add(new User("Bryce", "Vonilten", "bvonilte@calpoly.edu", "password4"));
        testUsers.add(new User("Miguel", "Duran", "mduran@calpoly.edu", "password5"));


        Set<RoleType> staffRoles = new HashSet<>();
        staffRoles.add(RoleType.CATALOG_ADMIN);
        testUsers.add(new User("Registrar", "Staff", "staff@calpoly.edu", "staff", staffRoles));

        testUsers.forEach(u -> userService.createNewUser(u));

//        // Add flow chart to user
//        User michael = userService.getUser("macrivel@calpoly.edu");
//        User jonathan = userService.getUser("jpautz@calpoly.edu");
//        User staff = userService.getUser("staff@calpoly.edu");
//        ArrayList<Flowchart> testFlowcharts = new ArrayList<>();
//        testFlowcharts.add(new Flowchart(michael, "My Flowchart", startQuarter, endQuarter));
//        testFlowcharts.add(new Flowchart(jonathan, "My Flowchart", startQuarter, endQuarter));
//        testFlowcharts.add(new Flowchart(jonathan, "My Flowchart 2", startQuarter, endQuarter));
//        testFlowcharts.add(new Flowchart(staff, "Software Engineering", startQuarter, endQuarter));
//        testFlowcharts.forEach(flowchart -> flowchartService.addFlowchart(flowchart));
//
//        ArrayList<Entry> testEntries = new ArrayList<>();
//        Flowchart jonathanMyFlow = flowchartService.getFlowchartByName(userService.getUser("jpautz@calpoly.edu"), "My Flowchart");
//        testEntries.add(new Entry(courseService.getCourseByTitle("Systems Programming"), jonathanMyFlow, quarterService.getQuarterByTermAndYear("FALL2016")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Calculus I"), jonathanMyFlow, quarterService.getQuarterByTermAndYear("FALL2016")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Engineering Economics"), jonathanMyFlow, quarterService.getQuarterByTermAndYear("FALL2016")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Oral Communication"), jonathanMyFlow, quarterService.getQuarterByTermAndYear("FALL2016")));
//
//        testEntries.add(new Entry(courseService.getCourseByTitle("Software Engineering I"), jonathanMyFlow, quarterService.getQuarterByTermAndYear("WINTER2017")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Calculus II"), jonathanMyFlow, quarterService.getQuarterByTermAndYear("WINTER2017")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Life Science For Engineers"), jonathanMyFlow, quarterService.getQuarterByTermAndYear("WINTER2017")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Chemistry I"), jonathanMyFlow, quarterService.getQuarterByTermAndYear("WINTER2017")));
//
//        testEntries.add(new Entry(courseService.getCourseByTitle("Software Engineering II"), jonathanMyFlow, quarterService.getQuarterByTermAndYear("SPRING2017")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Chemistry II"), jonathanMyFlow, quarterService.getQuarterByTermAndYear("SPRING2017")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Calculus III"), jonathanMyFlow, quarterService.getQuarterByTermAndYear("SPRING2017")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Bioengineering Fundamentals"), jonathanMyFlow, quarterService.getQuarterByTermAndYear("SPRING2017")));
//
//        Flowchart jonathanMyFlow2 = flowchartService.getFlowchartByName(userService.getUser("jpautz@calpoly.edu"), "My Flowchart 2");
//        testEntries.add(new Entry(courseService.getCourseByTitle("Calculus I"), jonathanMyFlow2, quarterService.getQuarterByTermAndYear("FALL2016"))); testEntries.add(new Entry(courseService.getCourseByTitle("Calculus I"), jonathanMyFlow2, quarterService.getQuarterByTermAndYear("FALL2016")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Engineering Economics"), jonathanMyFlow2, quarterService.getQuarterByTermAndYear("FALL2016")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Chemistry I"), jonathanMyFlow2, quarterService.getQuarterByTermAndYear("FALL2016")));
//
//        testEntries.add(new Entry(courseService.getCourseByTitle("Software Engineering I"), jonathanMyFlow2, quarterService.getQuarterByTermAndYear("WINTER2017")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Calculus II"), jonathanMyFlow2, quarterService.getQuarterByTermAndYear("WINTER2017")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Life Science For Engineers"), jonathanMyFlow2, quarterService.getQuarterByTermAndYear("WINTER2017")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Oral Communication"), jonathanMyFlow2, quarterService.getQuarterByTermAndYear("WINTER2017")));
//
//        testEntries.add(new Entry(courseService.getCourseByTitle("Software Engineering II"), jonathanMyFlow2, quarterService.getQuarterByTermAndYear("SPRING2017")));
//
//        testEntries.add(new Entry(courseService.getCourseByTitle("Bioengineering Fundamentals"), jonathanMyFlow2, quarterService.getQuarterByTermAndYear("SUMMER2017")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Calculus III"), jonathanMyFlow2, quarterService.getQuarterByTermAndYear("SUMMER2017")));
//
//
//        Flowchart staffFlow = flowchartService.getFlowchartByName(userService.getUser("staff@calpoly.edu"), "Software Engineering");
//        testEntries.add(new Entry(courseService.getCourseByTitle("Systems Programming"), staffFlow, quarterService.getQuarterByTermAndYear("FALL2016")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Calculus I"), staffFlow, quarterService.getQuarterByTermAndYear("FALL2016")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Engineering Economics"), staffFlow, quarterService.getQuarterByTermAndYear("FALL2016")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Oral Communication"), staffFlow, quarterService.getQuarterByTermAndYear("FALL2016")));
//
//        testEntries.add(new Entry(courseService.getCourseByTitle("Software Engineering I"), staffFlow, quarterService.getQuarterByTermAndYear("WINTER2017")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Calculus II"), staffFlow, quarterService.getQuarterByTermAndYear("WINTER2017")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Life Science For Engineers"), staffFlow, quarterService.getQuarterByTermAndYear("WINTER2017")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Chemistry I"), staffFlow, quarterService.getQuarterByTermAndYear("WINTER2017")));
//
//        testEntries.add(new Entry(courseService.getCourseByTitle("Software Engineering II"), staffFlow, quarterService.getQuarterByTermAndYear("SPRING2017")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Chemistry II"), staffFlow, quarterService.getQuarterByTermAndYear("SPRING2017")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Calculus III"), staffFlow, quarterService.getQuarterByTermAndYear("SPRING2017")));
//        testEntries.add(new Entry(courseService.getCourseByTitle("Bioengineering Fundamentals"), staffFlow, quarterService.getQuarterByTermAndYear("SPRING2017")));
//
//        testEntries.forEach(entry -> entryService.addEntry(entry));

    }
}
