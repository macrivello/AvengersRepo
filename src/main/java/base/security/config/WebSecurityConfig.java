package base.security.config;

import base.security.jwt.JwtAuthenticationTokenFilter;
import base.security.jwt.JwtAuthorizationExceptionHandler;
import base.security.user.PolyPathUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.data.repository.query.SecurityEvaluationContextExtension;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration // Tell Spring this is a configuration class
@EnableWebSecurity // Tell Spring to enable security as a web application
@EnableGlobalMethodSecurity(prePostEnabled=true) // Enable @Pre @PostAuthorize
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private JwtAuthorizationExceptionHandler unauthorizedHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf()
                .disable()
            .exceptionHandling().authenticationEntryPoint(unauthorizedHandler) // Custom exception handler. Used to return 401s.
                .and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
            .headers().cacheControl();// disable page caching

        http
            .authorizeRequests()
                // allow anonymous resource requests
                .antMatchers(HttpMethod.GET,"/resources/**").permitAll()
                .antMatchers(HttpMethod.GET,"/css/**").permitAll()
                .antMatchers(HttpMethod.GET,"/html/**").permitAll()
                .antMatchers(HttpMethod.GET,"/js/**").permitAll()
                .antMatchers(HttpMethod.GET,"/images/**").permitAll()
                .antMatchers(HttpMethod.GET,"/UserManHelpPage/**").permitAll()
                .antMatchers(HttpMethod.GET,"/favicon.ico").permitAll()
                .antMatchers(HttpMethod.GET, "/").permitAll()
                .antMatchers(HttpMethod.GET, "/login").permitAll() // to get auth token
                .antMatchers(HttpMethod.POST, "/login").permitAll() // to get auth token
                .antMatchers(HttpMethod.GET, "/search").permitAll() // to get auth token
                .antMatchers(HttpMethod.GET, "/courses").permitAll() // to get auth token
                .anyRequest().authenticated();

        // Custom JWT based security filter -- Check for JWT tokens
        http
                .addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth, PolyPathUserDetailsService polyPathUserDetailsService) throws Exception {
        auth
                .userDetailsService(polyPathUserDetailsService)
                .passwordEncoder(new BCryptPasswordEncoder());
    }

    @Bean
    public SecurityEvaluationContextExtension securityEvaluationContextExtension() {
        return new SecurityEvaluationContextExtension();
    }

    @Bean
    public JwtAuthenticationTokenFilter authenticationTokenFilterBean() throws Exception {
        return new JwtAuthenticationTokenFilter();
    }
}

