package base.student;

import base.flowchart.Flowchart;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Student implements Serializable{

    @Id
    @GeneratedValue
    private Long id;
    private int number;
    private String fname;
    private String lname;

    private List<Flowchart> flowchart = new ArrayList<>();

    public Student(){

    }

    public List<Flowchart> getFlowchart() {
        return flowchart;
    }

    public void setFlowchart(List<Flowchart> flowchart) {
        this.flowchart = flowchart;
    }

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
