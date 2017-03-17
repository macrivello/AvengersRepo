package base.flowchart;

import base.user.User;
import base.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FlowchartService {

    @Autowired
    private FlowchartRepository flowchartRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Flowchart> getAllFlowcharts() {
        List<Flowchart> flowcharts = new ArrayList<>();
        flowchartRepository.findAll().forEach(flowcharts::add);
        return flowcharts;
    }

    public List<Flowchart> getUsersFlowcharts(User user) {
        return user.getFlowcharts();
    }

    public Flowchart getFlowchart(Long id) {
        return flowchartRepository.findOne(id);
    }

    public Flowchart getFlowchartByName(User user, String name) {
        List<Flowchart> temp = user.getFlowcharts();
        for(Flowchart flowchart: temp)
        {
            if(flowchart.getName().equals(name))
            {
                return flowchart;
            }
        }
        return null;
    }

    public void addFlowchart(Flowchart flowchart)
    {
        flowchartRepository.save(flowchart);
    }

    public void addFlowchart(User user)
    {
        Flowchart newFlowchart = new Flowchart();
        newFlowchart.setUser(user);
        flowchartRepository.save(newFlowchart);
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

    public void removeAllFlowcharts()
    {
        flowchartRepository.deleteAll();
    }

}
