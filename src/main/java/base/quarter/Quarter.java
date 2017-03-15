package base.quarter;

import base.entry.Entry;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.annotation.SimpleObjectIdResolver;

import javax.persistence.*;
import java.util.List;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, resolver = SimpleObjectIdResolver.class, property = "id", scope=Quarter.class)
public class Quarter {
    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Term term;

    private int year;

    @JsonIgnoreProperties("quarter")
    @OneToMany(targetEntity = Entry.class, mappedBy = "quarter",
            cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Entry> entries;

    public Quarter(){}

    public Quarter(Long id, Term term, int year) {
        this.id = id;
        this.term = term;
        this.year = year;
    }

    public Quarter(Term term, int year) {
        this.term = term;
        this.year = year;
    }

    public Quarter(Quarter quarter) {
        this.id = quarter.id;
        this.term = quarter.term;
        this.year = quarter.year;
        this.entries = quarter.entries;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Term getTerm() {
        return term;
    }

    public void setTerm(Term term) {
        this.term = term;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public List<Entry> getEntries() {
        return entries;
    }

    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }
}
