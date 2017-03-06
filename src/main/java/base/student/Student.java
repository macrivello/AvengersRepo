package base.student;

import base.flowchart.Flowchart;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
public class Student implements Serializable{

    private Long id;
    private int number;
    private String fname;
    private String lname;

    private List<Flowchart> flowchart;

    public Student(){

    }

    @OneToMany(targetEntity = Flowchart.class, mappedBy = "student",
    cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    public List<Flowchart> getFlowcharts() {
        return flowchart;
    }

    public void setFlowcharts(List<Flowchart> flowchart) {
        this.flowchart = flowchart;
    }

    @Id
    @GeneratedValue
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }
}
