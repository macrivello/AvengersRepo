package base.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class CourseService {
	
	@Autowired
	private CourseRepository courseRepository;

	public List<Course> getAllCourses() {
		List<Course> courses = new ArrayList<>();
		courseRepository.findAll().forEach(courses::add);
		return courses;
	}
	
	public Course getCourse(Long id) {
		return courseRepository.findOne(id);
	}
	
	public void addCourse(Course course)
	{
		courseRepository.save(course);
	}
	
	public void updateCourse(Long id, Course course)
	{
		Course temp = courseRepository.findOne(id);
		if(course == null) {
			return;
		}
		else {
			temp.setId(course.getId());
			temp.setNumber(course.getNumber());
			temp.setTitle(course.getTitle());
			temp.getDepartment().setId(course.getDepartment().getId());
			temp.getDepartment().setPrefix(course.getDepartment().getPrefix());
			courseRepository.save(temp);
		}
	}
	
	public void deleteCourse(Long id)
	{
		courseRepository.delete(id);
	}

	public void removeAllCourses()
	{
		courseRepository.deleteAll();
	}

	public List<Course> getAllCoursesByDepartment(String dept) {
		return courseRepository.findByDepartment(dept.toUpperCase());
	}
}
