package base;

import base.security.jwt.JwtAuthenticationRequest;
import base.security.jwt.JwtTokenResponse;
import base.security.jwt.JwtTokenUtil;
import base.security.util.CookieUtil;
import base.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mobile.device.Device;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class LoginController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JwtTokenUtil jwtTokenUtil;

  @Autowired
  private UserDetailsService userDetailsService;

  @Value("${jwt.requestHeader}")
  private String tokenHeader;
  @Value("${server.cookie.domain}")
  private String domain;
  @Value("${server.cookie.http-only}")
  private String httpOnly;
  @Value("${server.cookie.secure}")
  private String secure;
  @Value("${server.cookie.path}")
  private String path;
  @Value("${server.cookie.max-age}")
  private String maxAge;
  @Value("${server.cookie.name}")
  private String cookieName;

  @RequestMapping(value = "/login", method = RequestMethod.POST)
  @ResponseBody
  public User createAuthenticationToken(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, @RequestBody JwtAuthenticationRequest authenticationRequest, Device device) throws AuthenticationException {

    // Perform the security
    final Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        authenticationRequest.getUsername(),
        authenticationRequest.getPassword()
      )
    );
    SecurityContextHolder.getContext().setAuthentication(authentication);

    // Reload password post-security so we can generate token
    final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

    final String token = jwtTokenUtil.generateToken(userDetails, device);

    CookieUtil.create(httpServletResponse, cookieName, token, Boolean.getBoolean(secure), Integer.parseInt(maxAge), domain);

    return (User) userDetails;
  }

  @RequestMapping(value = "/signout", method = RequestMethod.GET)
  public ResponseEntity createBlankAuthenticationToken(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws AuthenticationException {

    CookieUtil.create(httpServletResponse, cookieName, "", Boolean.getBoolean(secure), Integer.parseInt(maxAge), domain);

    return ResponseEntity.ok().build();
  }

  @RequestMapping(value = "/refresh", method = RequestMethod.GET)
  public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
    String token = request.getHeader(tokenHeader);
    String username = jwtTokenUtil.getUsernameFromToken(token);
    UserDetails user = userDetailsService.loadUserByUsername(username);

    return ResponseEntity.ok(jwtTokenUtil.refreshToken(token));

//        if (jwtTokenUtil.canTokenBeRefreshed(token, user.getLastPasswordResetDate())) {
//            String refreshedToken = jwtTokenUtil.refreshToken(token);
//            return ResponseEntity.ok(new JwtAuthenticationResponse(refreshedToken));
//        } else {
//            return ResponseEntity.badRequest().body(null);
//        }
  }
}
