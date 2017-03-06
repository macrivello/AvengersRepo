package base.entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EntryController {

    @Autowired
    private EntryService entryService;

    @RequestMapping("/entriss")
    public List<Entry> getAllEntries(){
        return entryService.getAllEntries();
    }

    @RequestMapping("entries/{id}")
    public Entry getEntry(@PathVariable Long id) {
        return entryService.getEntry(id);
    }

    @RequestMapping(method= RequestMethod.POST, value="/entries")
    public void addEntry(@RequestBody Entry entry) {
        entryService.addEntry(entry);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/entries/{id}")
    public void updateEntry(@PathVariable Long id, @RequestBody Entry entry) {
        entryService.updateEntry(id, entry);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/entriess/{id}")
    public void deleteEntry(@PathVariable Long id) {
        entryService.deleteEntry(id);
    }


}
