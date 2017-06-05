package base.quarter;

import base.Application;
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

    public Quarter getQuarterByTermAndYear(String termYear)
    {
        List<Quarter> quarters = getAllQuarters();
        String temp = "";
        for(Quarter q : quarters)
        {
            temp = "" + q.getTerm() + q.getYear();
            if(temp.equals(termYear))
            {
                return q;
            }
        }
        throw new IllegalArgumentException("No quarter available for : " + termYear);
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

    public Quarter getStartOfCurrentYear(){
      return getQuarterByTermAndYear(Application.CURRENT_YEAR_AND_TERM);
    }

    public Quarter nextQuarter(Quarter startQuarter, int numberOfQuartersInTheFuture) {
      int startingYear = startQuarter.getYear();
      Term startingTerm = startQuarter.getTerm();

      int years = numberOfQuartersInTheFuture / 4;
      int additionalQuarters = numberOfQuartersInTheFuture % 4;

      Term endTerm = Term.fromValue((startingTerm.getValue() + additionalQuarters) % 4);
      return getQuarterByTermAndYear(endTerm.name() + (startingYear + years));
    }
}
