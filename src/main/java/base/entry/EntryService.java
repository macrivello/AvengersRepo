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
            temp.getCourse().setTitle(entry.getCourse().getTitle());
            //Course -> Department
            temp.getCourse().getDepartment().setId(entry.getCourse().getDepartment().getId());
            temp.getCourse().getDepartment().setPrefix(entry.getCourse().getDepartment().getPrefix());
            //Flowchart -> User
            temp.getFlowchart().setId(entry.getFlowchart().getId());

            // TODO: Just set user as current user in request.
            temp.getFlowchart().getUser().setId(entry.getFlowchart().getUser().getId());
//            temp.getFlowchart().getUser().setNumber(entry.getFlowchart().getUser().getNumber());
//            temp.getFlowchart().getUser().setLname(entry.getFlowchart().getUser().getLname());
//            temp.getFlowchart().getUser().setFname(entry.getFlowchart().getUser().getFname());
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
