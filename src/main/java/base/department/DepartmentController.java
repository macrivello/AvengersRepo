package base.department;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DepartmentController {

    @Autowired
    private DepartmentService DepartmentService;

    @RequestMapping("/departments")
    public List<Department> getAllDepartments(){
        return DepartmentService.getAllDepartments();
    }

    @RequestMapping("departments/{id}")
    public Department getDepartment(@PathVariable Long id) {
        return DepartmentService.getDepartment(id);
    }

    @RequestMapping(method= RequestMethod.POST, value="/departments")
    public void addDepartment(@RequestBody Department Department) {
        DepartmentService.addDepartment(Department);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/departments/{id}")
    public void updateDepartment(@PathVariable Long id, @RequestBody Department Department) {
        DepartmentService.updateDepartment(id, Department);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/departments/{id}")
    public void deleteDepartment(@PathVariable Long id) {
        DepartmentService.deleteDepartment(id);
    }


}


