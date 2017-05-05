package base;

import base.security.user.CurrentUser;
import base.security.util.CookieUtil;
import base.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;


@Controller // so framework can recognize this as a controller class
public class HomeController {


    @RequestMapping("/")
    public String index(HttpServletRequest httpServletRequest, @CurrentUser User user) {
      return "static/index.html";
    }

}
