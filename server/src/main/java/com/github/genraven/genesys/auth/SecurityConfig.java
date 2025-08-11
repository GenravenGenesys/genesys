package com.github.genraven.genesys.auth;

import org.springframework.context.annotation.*;
import org.springframework.security.config.web.server.ServerHttpSecurity;
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
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http, JwtReactiveAuthenticationManager authManager) {
        return http
                .authorizeExchange(exchange -> exchange
                        .pathMatchers("/dm/**").hasRole("DM")
                        .pathMatchers("/player/**").hasRole("PLAYER")
                        .anyExchange().authenticated()
                )
                .authenticationManager(authManager)
                .securityContextRepository(new JwtSecurityContextRepository(authManager))
                .build();
    }

}

