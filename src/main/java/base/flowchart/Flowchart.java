package base.flowchart;

import base.entry.Entry;
import base.user.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
public class Flowchart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("flowcharts")
    private User user;

    @JsonIgnoreProperties("flowchart")
    @OneToMany(targetEntity = Entry.class, mappedBy = "flowchart",
            cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Entry> entries;

    public Flowchart(){}

    public Flowchart(User user) {
        this.user = user;
    }

    public Flowchart(Flowchart flowchart) {
        this.id = flowchart.id;
        this.user = flowchart.user;
        this.entries = flowchart.entries;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Entry> getEntries() {
        return entries;
    }

    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }
}
