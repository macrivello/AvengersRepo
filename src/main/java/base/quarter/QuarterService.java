package base.quarter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuarterService {

    @Autowired
    private QuarterRepository quarterRepository;

    public List<Quarter> getAllQuarters() {
        List<Quarter> quarters = new ArrayList<>();
        quarterRepository.findAll().forEach(quarters::add);
        return quarters;
    }

    public Quarter getQuarter(Long id) {
        return quarterRepository.findOne(id);
    }

    public void addQuarter(Quarter quarter)
    {
        quarterRepository.save(quarter);
    }

    public void updateQuarter(Long id, Quarter quarter)
    {
        Quarter temp = quarterRepository.findOne(id);
        if(quarter == null) {
            return;
        }
        else {
            temp.setTerm(quarter.getTerm());
            temp.setYear(quarter.getYear());
            quarterRepository.save(temp);
        }
    }

    public void deleteQuarter(Long id)
    {
        quarterRepository.delete(id);
    }

    public void removeAllQuarters()
    {
        quarterRepository.deleteAll();
    }
    
}
