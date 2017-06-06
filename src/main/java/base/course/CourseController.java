package base.course;

import base.department.Department;
import base.department.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/")
public class CourseController {

	@Autowired
	private CourseService courseService;
	@Autowired
	private DepartmentService departmentService;

	@RequestMapping("courses")
	public List<Course> getAllCourses(@RequestParam(value="term", required = false) String term) {
		if (!StringUtils.isEmpty(term)) {
			return courseService.getCoursesBySearchTerm(term);
		}
    else {
      return courseService.getAllCourses();
    }
	}

	@RequestMapping("courses/{id}")
	public Course getCourse(@PathVariable Long id) {
		return courseService.getCourse(id);
	}

	@RequestMapping(method=RequestMethod.POST, value="courses")
	public void addCourse(@RequestBody Course course) {
		courseService.addCourse(course);
	}

	@RequestMapping(method=RequestMethod.PUT, value="courses/{id}")
	public void updateCourse(@PathVariable Long id, @RequestBody Course course) {
		courseService.updateCourse(id, course);
	}

	@RequestMapping(method=RequestMethod.DELETE, value="courses/{id}")
	public void deleteCourse(@PathVariable Long id) {
		courseService.deleteCourse(id);
	}

}
