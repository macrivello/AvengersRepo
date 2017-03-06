package base.entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EntryService {

    @Autowired
    private EntryRepository entryRepository;

    public List<Entry> getAllEntries() {
        List<Entry> entries = new ArrayList<>();
        entryRepository.findAll().forEach(entries::add);
        return entries;
    }

    public Entry getEntry(Long id) {
        return entryRepository.findOne(id);
    }

    public void addEntry(Entry entry)
    {
        entryRepository.save(entry);
    }

    public void updateEntry(Long id, Entry entry)
    {
        Entry temp = entryRepository.findOne(id);
        if(entry == null) {
            return;
        }
        else {
            //Entry
            temp.setId(entry.getId());
            //Course
            temp.getCourse().setId(entry.getCourse().getId());
            temp.getCourse().setNumber(entry.getCourse().getNumber());
            temp.getCourse().setPrefix(entry.getCourse().getPrefix());
            temp.getCourse().setTitle(entry.getCourse().getTitle());
            //Flowchart -> Student
            temp.getFlowchart().setId(entry.getFlowchart().getId());
            temp.getFlowchart().getStudent().setId(entry.getFlowchart().getStudent().getId());
            temp.getFlowchart().getStudent().setNumber(entry.getFlowchart().getStudent().getNumber());
            temp.getFlowchart().getStudent().setLname(entry.getFlowchart().getStudent().getLname());
            temp.getFlowchart().getStudent().setFname(entry.getFlowchart().getStudent().getFname());
            //Quarter
            temp.getQuarter().setId(entry.getQuarter().getId());
            temp.getQuarter().setTerm(entry.getQuarter().getTerm());
            temp.getQuarter().setYear(entry.getQuarter().getYear());
            //Save
            entryRepository.save(temp);
        }
    }

    public void deleteEntry(Long id)
    {
        entryRepository.delete(id);
    }
    
}
