package base.security.user;

import base.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Proxy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

public final class PolyPathUserDetails extends User implements UserDetails {

    public PolyPathUserDetails(User user){
        super(user);
    }

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.getRoles() == null) {
            return AuthorityUtils.NO_AUTHORITIES;
        }

        ArrayList<String> authorities = new ArrayList<>();
        this.getRoles().forEach(r -> authorities.add(r.getRole()));
        return AuthorityUtils.createAuthorityList(authorities.toArray(new String[0]));
    }

    @Override
    public String getUsername() {
        return getEmail();
    }


    /********************************************************************
     Lets not worry about these for now. Hard code them to true.
     *******************************************************************/
    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return true;
    }

    private static final long serialVersionUID = 5639683223516504866L;
}