package base.controller;

import javassist.tools.web.BadHttpRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.NoHandlerFoundException;

@ControllerAdvice
public class GlobalRequestExceptionHandler {

    /*
      This is necessary to enable Angular routing.
      For example, the Angular app will have a URL of /flowchart
      to show the FlowchartComponent. /flowchart will not be a valid endpoint
      on the server, so we just return index.html (which contains the Angular app).

       404s can then be handled by Angular's own routes.
     */
    @ResponseStatus(HttpStatus.FOUND)
    @ExceptionHandler({NoHandlerFoundException.class, HttpRequestMethodNotSupportedException.class})
    public String handleNotFound(Exception ex) {

      return "static/index.html";
    }
}
