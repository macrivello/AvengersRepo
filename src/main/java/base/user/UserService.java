package base.user;

import base.security.user.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUser(Long id){
        return userRepository.findOne(id);
    }

    public User getUser(String email){
        return userRepository.findByEmail(email);
    }

    public User getCurrentUser(@CurrentUser User user){
        return user;
    }

    public User createNewUser(User reqUser) {
        User user = new User();
        user.setEmail(reqUser.getEmail());
        user.setFirstName(reqUser.getFirstName());
        user.setLastName(reqUser.getLastName());
        user.setPassword(new BCryptPasswordEncoder().encode(reqUser.getPassword()));
        user.setRoles(reqUser.getRoles());
        return userRepository.save(user);
    }

    public void removeAllUsers() {
        userRepository.deleteAll();
    }
}
