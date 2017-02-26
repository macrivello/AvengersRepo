package base.controller;

import base.data.CourseRepository;
import base.model.Course;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/course")
public class CourseApiController {

    private final CourseRepository courseRepository;

    public CourseApiController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @GetMapping
    public ArrayList<Course> readAll() {
        ArrayList<Course> courses = new ArrayList<>();
        courseRepository.findAll().forEach(course -> courses.add(course));
        return courses;
    }

    @GetMapping("{id}")
    public Course read(@PathVariable Long id) {
        return courseRepository.findOne(id);
    }

    @PostMapping
    public Course create(@RequestBody Course input) {
        return courseRepository.save(new Course(input.getPrefix(), input.getNumber(), input.getTitle()));
    }

    @DeleteMapping("{id}")
    public void destroy(@PathVariable Long id) {
        courseRepository.delete(id);
    }

    @PutMapping("{id}")
    public Course update(@PathVariable Long id, @RequestBody Course input) {
        Course course = courseRepository.findOne(id);
        if (course == null) {
            return null;
        } else {
            course.setNumber(input.getNumber());
            course.setPrefix(input.getPrefix());
            course.setTitle(input.getTitle());
            return courseRepository.save(course);
        }
    }

}
