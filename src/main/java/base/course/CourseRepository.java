package base.course;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CourseRepository extends CrudRepository<Course, Long> {
    List<Course> findByDepartment(String dept);
    Course findCourseByTitle(String title);
}
