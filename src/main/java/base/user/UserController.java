package base.user;

import base.security.user.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Return only logged in user
    @GetMapping("/me")
    public User getCurrentUser(@CurrentUser User user) {
        return user;
    }

//    @RequestMapping("/all")
//    public List<User> getUsers(@CurrentUser UserDetails currentUser) {
//        ArrayList<User> users = new ArrayList<>();
//        if (currentUser.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
//            userRepository.findAll().forEach(users::add);
//        }
//        return users;
//    }

    @PostMapping
    public User create(@Valid @RequestBody User reqUser) {
        return userService.createNewUser(reqUser);
    }

//    @DeleteMapping("{id}")
//    public void delete(@PathVariable Long id) {
//        // ADMIN Route
//        userRepository.delete(id);
//    }
//
//    @PutMapping("{id}")
//    public User update(@PathVariable Long id, @RequestBody User reqUser) {
//        User user = userRepository.findOne(id);
//        if (user == null) {
//            return null;
//        } else {
//            user.setEmail(reqUser.getEmail());
//            user.setFirstName(reqUser.getFirstName());
//            user.setLastName(reqUser.getLastName());
//            user.setEmail(reqUser.getEmail());
//            user.setPassword(new BCryptPasswordEncoder().encode(reqUser.getPassword()));
//            return userRepository.save(user);
//        }
//    }
}
