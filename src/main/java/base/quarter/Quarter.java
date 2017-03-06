package base.quarter;

import base.entry.Entry;

import javax.persistence.*;
import java.util.List;

@Entity
public class Quarter {

    private Long id;
    private String term;
    private int year;
    private List<Entry> entries;

    public Quarter(){

    }

    @Id
    @GeneratedValue
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    //TODO Mapping
    @OneToMany(targetEntity = Entry.class, mappedBy = "quarter",
    cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<Entry> getEntries() {
        return entries;
    }

    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }
}
