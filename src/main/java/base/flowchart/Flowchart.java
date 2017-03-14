package base.flowchart;

import base.entry.Entry;
import base.user.User;

import javax.persistence.*;
import java.util.List;

@Entity
public class Flowchart {

    private Long id;
    private User user;
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

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @OneToMany(targetEntity = Entry.class, mappedBy = "flowchart",
            cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<Entry> getEntries() {
        return entries;
    }

    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }
}
