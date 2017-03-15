package base.entry;

import base.course.Course;
import base.flowchart.Flowchart;
import base.quarter.Quarter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
public class Entry {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonIgnoreProperties("entries")
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @JsonIgnoreProperties("entries")
    @ManyToOne
    @JoinColumn(name = "flowchart_id")
    private Flowchart flowchart;

    @JsonIgnoreProperties("entries")
    @ManyToOne
    @JoinColumn(name = "quarter_id")
    private Quarter quarter;

    public Entry(){

    }

    public Entry(Course course, Flowchart flowchart, Quarter quarter) {
        this.course = course;
        this.flowchart = flowchart;
        this.quarter = quarter;
    }

    public Entry(Entry entry) {
        this.id = entry.id;
        this.course = entry.course;
        this.flowchart = entry.flowchart;
        this.quarter = entry.quarter;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Flowchart getFlowchart() {
        return flowchart;
    }

    public void setFlowchart(Flowchart flowchart) {
        this.flowchart = flowchart;
    }

    public Quarter getQuarter() {
        return quarter;
    }

    public void setQuarter(Quarter quarter) {
        this.quarter = quarter;
    }
}
