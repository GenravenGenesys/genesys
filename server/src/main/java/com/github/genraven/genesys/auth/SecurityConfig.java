package com.github.genraven.genesys.auth;

import org.springframework.context.annotation.*;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public JwtUtil jwtUtil() {
        return new JwtUtil();
    }

    @Bean
    public JwtReactiveAuthenticationManager authManager(JwtUtil jwtUtil) {
        return new JwtReactiveAuthenticationManager(jwtUtil);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http, JwtReactiveAuthenticationManager authManager) {
        return http
                .csrf(ServerHttpSecurity.CsrfSpec::disable) // Disable CSRF for stateless JWT
                .formLogin(ServerHttpSecurity.FormLoginSpec::disable) // Disable default login page
                .httpBasic(ServerHttpSecurity.HttpBasicSpec::disable) // Disable basic auth dialog
                .authorizeExchange(exchange -> exchange
                        .pathMatchers("/auth/**").permitAll() // Allow login/signup endpoints
                        .pathMatchers("/dm/**").hasRole("DM")
                        .pathMatchers("/player/**").hasRole("PLAYER")
                        .anyExchange().authenticated()
                )
                .authenticationManager(authManager)
                .securityContextRepository(new JwtSecurityContextRepository(authManager))
                .build();
    }
}
