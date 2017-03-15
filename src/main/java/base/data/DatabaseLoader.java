package base.data;

import base.course.Course;
import base.course.CourseService;
import base.department.Department;
import base.department.DepartmentService;
import base.entry.Entry;
import base.entry.EntryService;
import base.flowchart.Flowchart;
import base.flowchart.FlowchartService;
import base.quarter.Quarter;
import base.quarter.QuarterService;
import base.quarter.Term;
import base.security.user.RoleType;
import base.user.User;
import base.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
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


        // This isn't necessary, I've changed ddl-auto to `create-drop` from `update`
//        entryService.removeAllEntries();
//        flowchartService.removeAllFlowcharts();
//        quarterService.removeAllQuarters();
//        courseService.removeAllCourses();
//        departmentService.removeAllDepartments();
//        userService.removeAllUsers();

        // Add Departments
        ArrayList<Department> testDepartments = new ArrayList<>();
        testDepartments.add(new Department("CPE"));
        testDepartments.add(new Department("MATH"));
        testDepartments.forEach(department -> departmentService.addDepartment(department));

        // Add Quarters
        ArrayList<Quarter> testQuarters = new ArrayList<>();
        testQuarters.add(new Quarter(Term.FALL, 2016));
        testQuarters.add(new Quarter(Term.WINTER, 2017));
        testQuarters.add(new Quarter(Term.SPRING, 2017));
        testQuarters.add(new Quarter(Term.SUMMER, 2017));
        testQuarters.add(new Quarter(Term.FALL, 2017));
        testQuarters.add(new Quarter(Term.WINTER, 2018));
        testQuarters.add(new Quarter(Term.SPRING, 2018));
        testQuarters.add(new Quarter(Term.SUMMER, 2018));
        testQuarters.add(new Quarter(Term.FALL, 2018));
        testQuarters.add(new Quarter(Term.WINTER, 2019));
        testQuarters.add(new Quarter(Term.SPRING, 2019));
        testQuarters.add(new Quarter(Term.SUMMER, 2019));
        testQuarters.forEach(quarter -> quarterService.addQuarter(quarter));

        // Add users
        ArrayList<User> testUsers = new ArrayList<>();
        testUsers.add(new User("Michael", "Crivello", "macrivel@calpoly.edu", "password1"));
        testUsers.add(new User("Jonathan", "Pautz", "jpautz@calpoly.edu", "password2"));
        testUsers.add(new User("Matt", "Jimenez", "mpjimene@calpoly.edu", "password3"));
        testUsers.add(new User("Bryce", "Vonilten", "bvonilte@calpoly.edu", "password4"));
        testUsers.add(new User("Miguel", "Duran", "mduran@calpoly.edu", "password5"));

        Set<RoleType> staffRoles = new HashSet<>();
        staffRoles.add(RoleType.CATALOG_ADMIN);
        testUsers.add(new User("Registrar", "Staff", "staff@calpoly.edu", "staff", staffRoles));

        testUsers.forEach(u -> userService.createNewUser(u));

        // Add flow chart to user
        User michael = userService.getUser("macrivel@calpoly.edu");
        ArrayList<Flowchart> testFlowcharts = new ArrayList<>();
        testFlowcharts.add(new Flowchart(michael));
//        testFlowcharts.add(new Flowchart(userService.getUser((long) 1)));
//        testFlowcharts.add(new Flowchart(userService.getUser((long) 2)));
//        testFlowcharts.add(new Flowchart(userService.getUser((long) 3)));
//        testFlowcharts.add(new Flowchart(userService.getUser((long) 4)));
        testFlowcharts.forEach(flowchart -> flowchartService.addFlowchart(flowchart));

        // Add courses
        ArrayList<Course> testCourses = new ArrayList<>();
        Department math = departmentService.getDepartmentByName("MATH");
        Department cpe = departmentService.getDepartmentByName("CPE");
        if (math != null) {
            testCourses.add(new Course(141, "Calc I", math));
            testCourses.add(new Course(142, "Calc II", math));
            testCourses.add(new Course(143, "Calc III", math));
            testCourses.add(new Course(241, "Calc IV", math));
        }
        if (cpe != null) {
            testCourses.add(new Course(308, "Software Engineering I", cpe));
            testCourses.add(new Course(309, "Software Engineering II", cpe));
            testCourses.add(new Course(357, "Systems Programming", cpe));
        }

        testCourses.forEach(course -> courseService.addCourse(course));

//        ArrayList<Entry> testEntries = new ArrayList<>();
//        testEntries.add(new Entry(courseService.getCourse((long) 3),flowchartService.getFlowchart((long) 0), quarterService.getQuarter((long) 0)));
//        testEntries.add(new Entry(courseService.getCourse((long) 4),flowchartService.getFlowchart((long) 0), quarterService.getQuarter((long) 1)));
//        testEntries.add(new Entry(courseService.getCourse((long) 1),flowchartService.getFlowchart((long) 0), quarterService.getQuarter((long) 1)));
//
//        testEntries.add(new Entry(courseService.getCourse((long) 2),flowchartService.getFlowchart((long) 1), quarterService.getQuarter((long) 0)));
//        testEntries.add(new Entry(courseService.getCourse((long) 1),flowchartService.getFlowchart((long) 1), quarterService.getQuarter((long) 1)));
//        testEntries.add(new Entry(courseService.getCourse((long) 2),flowchartService.getFlowchart((long) 1), quarterService.getQuarter((long) 2)));
//
//        testEntries.add(new Entry(courseService.getCourse((long) 1),flowchartService.getFlowchart((long) 2), quarterService.getQuarter((long) 1)));
//
//        testEntries.add(new Entry(courseService.getCourse((long) 1),flowchartService.getFlowchart((long) 3), quarterService.getQuarter((long) 1)));
//
//        testEntries.add(new Entry(courseService.getCourse((long) 1),flowchartService.getFlowchart((long) 4), quarterService.getQuarter((long) 1)));
//
//        testEntries.forEach(entry -> entryService.addEntry(entry));
    }
}
