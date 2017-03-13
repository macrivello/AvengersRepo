package base.security.jwt;

import java.io.Serializable;

public class JwtTokenResponse implements Serializable{
    String token;

    public JwtTokenResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
