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
            temp.setId(flowchart.getId());
            temp.getStudent().setId(flowchart.getStudent().getId());
            temp.getStudent().setNumber(flowchart.getStudent().getNumber());
            temp.getStudent().setLname(flowchart.getStudent().getLname());
            temp.getStudent().setFname(flowchart.getStudent().getFname());
            flowchartRepository.save(temp);
        }
    }

    public void deleteFlowchart(Long id)
    {
        flowchartRepository.delete(id);
    }

}
