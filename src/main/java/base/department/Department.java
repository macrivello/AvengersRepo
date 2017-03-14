package base.department;

import base.course.Course;

import javax.persistence.*;
import java.util.*;

@Entity
public class Department {

    private Long id;
    private String prefix;

    private List<Course> courses;

    public Department () {

    }

    public Department(String prefix) {
        this.prefix = prefix;
    }

    public Department(Department department) {
        this.id = department.id;
        this.prefix = department.prefix;
        this.courses = department.courses;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;

    }

    @OneToMany(targetEntity = Course.class, mappedBy = "department", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }
}
