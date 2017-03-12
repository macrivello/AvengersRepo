package base.security;

import base.user.User;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Role {
    @Id
    @GeneratedValue
    private Long id;
    private String name; // TODO: We should probably
    private Set<User> users;



}
