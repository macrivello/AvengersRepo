package base.flowchart;

import base.security.user.CurrentUser;
import base.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
public class FlowchartController {

    @Autowired
    private FlowchartService flowchartService;

    @RequestMapping("flowcharts")
    public List<Flowchart> getAllFlowcharts(@CurrentUser User user) {
        return flowchartService.getUsersFlowcharts(user);
    }

    @RequestMapping("flowcharts/all")
    public List<Flowchart> getAllFlowcharts(){
        return flowchartService.getAllFlowcharts();
    }

    @RequestMapping("flowcharts/{id}")
    public Flowchart getFlowchart(@PathVariable Long id) {
        return flowchartService.getFlowchart(id);
    }

    @RequestMapping(method= RequestMethod.POST, value="flowcharts")
    public Flowchart addFlowchart(@CurrentUser User user) {
        return flowchartService.addFlowchart(user);
    }

    @RequestMapping(method=RequestMethod.PUT, value="flowcharts/{id}")
    public void updateFlowchart(@PathVariable Long id, @RequestBody Flowchart flowchart) {
        flowchartService.updateFlowchart(id, flowchart);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="flowcharts/{id}")
    public void deleteFlowchart(@PathVariable Long id) {
        flowchartService.deleteFlowchart(id);
    }

}
