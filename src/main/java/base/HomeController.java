package base;

import base.security.user.CurrentUser;
import base.security.util.CookieUtil;
import base.user.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;


@Controller // so framework can recognize this as a controller class
public class HomeController {


    @RequestMapping("/")
    public String index(HttpServletRequest httpServletRequest, @CurrentUser User user) {
        //TODO Check for auth token, show index, otherwise redirect

//        if (user == null) {
//            return "html/login.html";
//        }
//
//        return "html/home2.html";
      return "index.html";
    }

    @RequestMapping("/test")
    @ResponseBody
    public String testAngular(){
        return "communication with server works!";
    }
}
