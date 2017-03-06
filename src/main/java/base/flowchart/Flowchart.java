package base.flowchart;

import base.entry.Entry;
import base.student.Student;

import javax.persistence.*;
import java.util.List;

@Entity
public class Flowchart {


    private Long id;
    private Student student;
    private List<Entry> entries;

    public Flowchart(){

    }

    @Id
    @GeneratedValue
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "student_id")
    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }


    //TODO Mapping
    @OneToMany(targetEntity = Entry.class, mappedBy = "flowchart",
            cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<Entry> getEntries() {
        return entries;
    }

    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }
}
