package base.flowchart;

import base.security.user.CurrentUser;
import base.user.User;
import javassist.tools.web.BadHttpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
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
    public void addFlowchart(@CurrentUser User user) {
        if (user != null) {
            // create new empty flowchart for current user
            flowchartService.addFlowchart(user);
        }
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
