package base.flowchart;

import base.entry.Entry;
import base.user.User;
import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.List;

@Entity
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, resolver = SimpleObjectIdResolver.class, property = "id", scope=Flowchart.class)
public class Flowchart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("flowcharts")
    @JsonIdentityReference(alwaysAsId = true)
    private User user;

    @JsonIgnoreProperties("flowchart")
    @OneToMany(targetEntity = Entry.class, mappedBy = "flowchart",
            cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    @JsonIdentityReference(alwaysAsId = true)
    private List<Entry> entries;

    public Flowchart(){}

    public Flowchart(User user, String name) {
        this.user = user;
        this.name = name;
    }

    public Flowchart(Flowchart flowchart) {
        this.id = flowchart.id;
        this.name = flowchart.name;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Entry> getEntries() {
        return entries;
    }

    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }
}
