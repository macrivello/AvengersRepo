package base.flowchart;

import base.student.Student;

import javax.persistence.Entity;

@Entity
public class Flowchart {

    private Long id;
    private Student student;

    public Flowchart(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}
