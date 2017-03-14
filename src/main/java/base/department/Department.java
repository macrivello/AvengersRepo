package base.department;

import base.course.Course;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnoreProperties("department")
    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }
}
