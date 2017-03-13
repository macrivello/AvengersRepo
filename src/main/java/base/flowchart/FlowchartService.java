package base.flowchart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FlowchartService {

    @Autowired
    private FlowchartRepository flowchartRepository;

    public List<Flowchart> getAllFlowcharts() {
        List<Flowchart> flowcharts = new ArrayList<>();
        flowchartRepository.findAll().forEach(flowcharts::add);
        return flowcharts;
    }

    public Flowchart getFlowchart(Long id) {
        return flowchartRepository.findOne(id);
    }

    public void addFlowchart(Flowchart flowchart)
    {
        flowchartRepository.save(flowchart);
    }

    public void updateFlowchart(Long id, Flowchart flowchart)
    {
        Flowchart temp = flowchartRepository.findOne(id);
        if(flowchart == null) {
            return;
        }
        else {
            //Flowchart
            temp.setId(flowchart.getId());
            //TODO: just set User from current request
            temp.getUser().setId(flowchart.getUser().getId());
//            temp.getUser().setNumber(flowchart.getUser().getNumber());
//            temp.getUser().setLname(flowchart.getUser().getLname());
//            temp.getUser().setFname(flowchart.getUser().getFname());
            //Save
            flowchartRepository.save(temp);
        }
    }

    public void deleteFlowchart(Long id)
    {
        flowchartRepository.delete(id);
    }

}
