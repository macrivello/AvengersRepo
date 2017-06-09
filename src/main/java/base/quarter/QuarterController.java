package base.quarter;

import base.course.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.MalformedParametersException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/")
public class QuarterController {

    @Autowired
    private QuarterService quarterService;

    @RequestMapping("quarters")
    public List<Quarter> getAllQuarters(){
        return quarterService.getAllQuarters();
    }

    @RequestMapping("quarters/{id}")
    public Quarter getQuarter(@PathVariable Long id) {
        return quarterService.getQuarter(id);
    }

    @RequestMapping(method= RequestMethod.POST, value="quarters")
    public void addQuarter(@RequestBody Quarter quarter) {
        quarterService.addQuarter(quarter);
    }

    @RequestMapping(method=RequestMethod.PUT, value="quarters/{id}")
    public void updateQuarter(@PathVariable Long id, @RequestBody Quarter quarter) {
        quarterService.updateQuarter(id, quarter);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="quarters/{id}")
    public void deleteQuarter(@PathVariable Long id) {
        quarterService.deleteQuarter(id);
    }

    @RequestMapping("analytics/quarters/{id}")
    public List<CourseOccurance> getQuarterAnalytics(@PathVariable Long id)
    {
      return quarterService.getQuarterAnalytics(id);
    }

}
