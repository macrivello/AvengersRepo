package base;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ErrorPage;
import org.springframework.boot.web.servlet.ErrorPageRegistrar;
import org.springframework.boot.web.servlet.ErrorPageRegistry;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@SpringBootApplication
public class Application {

  public static void main(String[] args) {
      SpringApplication.run(Application.class, args);
    }

  @Component
  public class ErrorPageConfig implements ErrorPageRegistrar {
    @Override
    public void registerErrorPages(ErrorPageRegistry registry) {
      registry.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/"));
    }
  }
}
