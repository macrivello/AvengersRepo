package base.data;

import base.user.User;
import base.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class DatabaseLoader implements CommandLineRunner {

    // TODO: Inject Services
    @Autowired
    private UserService userService;

    @Override
    public void run(String... args) throws Exception {

        // TODO: Populate database with at least Courses and Users
        userService.removeAllUsers();

        ArrayList<User> testUsers = new ArrayList<>();
        testUsers.add(new User("Michael", "Crivello", "macrivel@calpoly.edu", "password1"));
        testUsers.add(new User("Jonathan", "Pautz", "jpautz@calpoly.edu", "password2"));
        testUsers.add(new User("Matt", "Jimenez", "mpjimene@calpoly.edu", "password3"));
        testUsers.add(new User("Bryce", "Vonilten", "bvonilte@calpoly.edu", "password4"));
        testUsers.add(new User("Miguel", "Duran", "mduran@calpoly.edu", "password5"));

        testUsers.forEach(u -> userService.createNewUser(u));
    }
}
