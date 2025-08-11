package com.github.genraven.genesys.handler.auth;

import com.github.genraven.genesys.auth.JwtUtil;
import com.github.genraven.genesys.repository.auth.UserRepository;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@Component
public class AuthHandler {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AuthHandler(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public Mono<ServerResponse> login(ServerRequest request) {
        return request.bodyToMono(Map.class)
                .flatMap(body -> {
                    String username = (String) body.get("username");
                    String password = (String) body.get("password");

                    return userRepository.findByUsername(username)
                            .filter(user -> encoder.matches(password, user.getPassword()))
                            .flatMap(user -> {
                                String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
                                return ServerResponse.ok()
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .bodyValue(Map.of("token", token));
                            })
                            .switchIfEmpty(ServerResponse.status(401).build());
                });
    }
}

