package base.data;

import base.course.Course;
import base.course.CourseService;
import base.department.Department;
import base.department.DepartmentService;
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
        testDepartments.add(new Department("CSC"));
        testDepartments.add(new Department("MATH"));
        testDepartments.add(new Department("STAT"));
        testDepartments.add(new Department("IME"));
        testDepartments.add(new Department("ENGL"));
        testDepartments.add(new Department("CHEM"));
        testDepartments.add(new Department("PHYS"));
        testDepartments.add(new Department("PSY"));
        testDepartments.add(new Department("COMS"));
        testDepartments.add(new Department("BIO"));
        testDepartments.add(new Department("BMED"));
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
        testQuarters.add(new Quarter(Term.FALL, 2019));
        testQuarters.add(new Quarter(Term.WINTER, 2020));
        testQuarters.add(new Quarter(Term.SPRING, 2020));
        testQuarters.add(new Quarter(Term.SUMMER, 2020));
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
        User jonathan = userService.getUser("jpautz@calpoly.edu");
        ArrayList<Flowchart> testFlowcharts = new ArrayList<>();
        testFlowcharts.add(new Flowchart(michael, "My Flowchart"));
        testFlowcharts.add(new Flowchart(jonathan, "My Flowchart"));
        testFlowcharts.forEach(flowchart -> flowchartService.addFlowchart(flowchart));

        // Add courses
        ArrayList<Course> testCourses = new ArrayList<>();
        Department math = departmentService.getDepartmentByName("MATH");
        Department cpe = departmentService.getDepartmentByName("CPE");
        Department csc = departmentService.getDepartmentByName("CSC");
        Department stat =departmentService.getDepartmentByName("STAT");
        Department ime =departmentService.getDepartmentByName("IME");
        Department engl =departmentService.getDepartmentByName("ENGL");
        Department chem =departmentService.getDepartmentByName("CHEM");
        Department phys =departmentService.getDepartmentByName("PHYS");
        Department phy =departmentService.getDepartmentByName("PHY");
        Department coms =departmentService.getDepartmentByName("COMS");
        Department bio =departmentService.getDepartmentByName("BIO");
        Department bmed =departmentService.getDepartmentByName("BMED");


        if (math != null) {
            testCourses.add(new Course(141, "Calculus I", math));
            testCourses.add(new Course(142, "Calculus II", math));
            testCourses.add(new Course(143, "Calculus III", math));
            testCourses.add(new Course(241, "Calculus IV", math));
            testCourses.add(new Course(244, "Linear Analysis I", math));
        }
        if (cpe != null) {
            testCourses.add(new Course(123, "Introduction to Computing", cpe));
            testCourses.add(new Course(101, "Fundamentals of Computer Science I", cpe));
            testCourses.add(new Course(102, "Fundamentals of Computer Science II", cpe));
            testCourses.add(new Course(103, "Fundamentals of Computer Science III", cpe));
            testCourses.add(new Course(300, "Professional Responsibilities", cpe));
            testCourses.add(new Course(308, "Software Engineering I", cpe));
            testCourses.add(new Course(309, "Software Engineering II", cpe));
            testCourses.add(new Course(357, "Systems Programming", cpe));
            testCourses.add(new Course(402, "Software Requirements Engineering", cpe));
            testCourses.add(new Course(405, "Software Construction", cpe));
            testCourses.add(new Course(406, "Software Deployment", cpe));
            testCourses.add(new Course(430, "Programming Languages I", cpe));
            testCourses.add(new Course(484, "User Centered Software Design and Development", cpe));
        }
        if (csc != null) {
            testCourses.add(new Course(225, "Introduction to Computer Organization", csc));
            testCourses.add(new Course(305, "Individual Software Design and Development", csc));
            testCourses.add(new Course(348, "Discrete Structures", csc));
            testCourses.add(new Course(349, "Design and Analysis of Algorithms", csc));
            testCourses.add(new Course(491, "Senior Project I", csc));
            testCourses.add(new Course(492, "Senior Project II", csc));
        }
        if (stat != null) {
            testCourses.add(new Course(312, "Statistical Methods For Engineers", stat));
        }
        if (ime != null) {
            testCourses.add(new Course(314, "Engineering Economics", ime));
        }
        if (engl != null) {
            testCourses.add(new Course(133, "Expository Writing", engl));
            testCourses.add(new Course(149, "Technical Writing For Engineers", engl));
        }
        if (chem != null) {
            testCourses.add(new Course(124, "Chemistry I", chem));
            testCourses.add(new Course(125, "Chemistry II", chem));
            testCourses.add(new Course(126, "Chemistry III", chem));
        }
        if (phys != null) {
            testCourses.add(new Course(141, "Physics I", phys));
            testCourses.add(new Course(132, "Physics II", phys));
            testCourses.add(new Course(133, "Physics III", phys));
        }
        if (phy != null) {
            testCourses.add(new Course(350, "Teamwork", phy));
            testCourses.add(new Course(351, "Group Dynamics", phy));
        }
        if (coms != null) {
            testCourses.add(new Course(101, "Oral Communication", coms));
            testCourses.add(new Course(217, "Small Group Communication", coms));
        }
        if (bio != null) {
            testCourses.add(new Course(213, "Life Science For Engineers", bio));
        }
        if (bmed != null) {
            testCourses.add(new Course(213, "Bioengineering Fundamentals", bmed));
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
