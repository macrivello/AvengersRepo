package base.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.stream.Collectors;
import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class CourseService {

	@Autowired
	private CourseRepository courseRepository;

	public List<Course> getAllCourses() {
		List<Course> courses = new ArrayList<>();
		courseRepository.findAll().forEach(courses::add);
		return courses;
	}

	public List<Course> getCoursesBySearchTerm(String term) {
	  return StreamSupport.stream(courseRepository.findAll().spliterator(), true)
      .filter(c -> c.toString().toLowerCase().contains(term.toLowerCase()))
      .collect(Collectors.toList());
  }

	public Course getCourse(Long id) {
		return courseRepository.findOne(id);
	}

	public Course getCourseByTitle(String title)
	{
		return courseRepository.findCourseByTitle(title);
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
			temp.setUnits(course.getUnits());
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
