package base.data;

import base.security.user.RoleType;
import base.user.User;
import base.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

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

        Set<RoleType> staffRoles = new HashSet<>();
        staffRoles.add(RoleType.CATALOG_ADMIN);
        testUsers.add(new User("Registrar", "Staff", "staff@calpoly.edu", "staff", staffRoles));

        testUsers.forEach(u -> userService.createNewUser(u));
    }
}
