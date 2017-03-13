package base.entry;

import base.course.Course;
import base.flowchart.Flowchart;
import base.quarter.Quarter;

import javax.persistence.*;

@Entity
public class Entry {

    private Long id;
    private Course course;
    private Flowchart flowchart;
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

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "course_id")
    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    @ManyToOne
    @JoinColumn(name = "flowchart_id")
    public Flowchart getFlowchart() {
        return flowchart;
    }

    public void setFlowchart(Flowchart flowchart) {
        this.flowchart = flowchart;
    }

    @ManyToOne
    @JoinColumn(name = "quarter_id")
    public Quarter getQuarter() {
        return quarter;
    }

    public void setQuarter(Quarter quarter) {
        this.quarter = quarter;
    }
}
