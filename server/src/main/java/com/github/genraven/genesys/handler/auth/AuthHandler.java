package com.github.genraven.genesys.handler.auth;

import com.github.genraven.genesys.auth.JwtUtil;
import com.github.genraven.genesys.domain.auth.User;
import com.github.genraven.genesys.service.auth.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class AuthHandler {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public Mono<ServerResponse> login(ServerRequest request) {
        return request.bodyToMono(Map.class)
                .flatMap(body -> {
                    String username = (String) body.get("username");
                    String password = (String) body.get("password");

                    return userService.authenticateUser(username, password)
                            .flatMap(user -> {
                                String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
                                return ServerResponse.ok()
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .bodyValue(Map.of("token", token));
                            })
                            .switchIfEmpty(ServerResponse.status(HttpStatus.UNAUTHORIZED).build());
                });
    }

    public Mono<ServerResponse> signup(ServerRequest request) {
        return request.bodyToMono(User.class)
                .flatMap(userService::createUser)
                .flatMap(user -> ServerResponse.status(HttpStatus.CREATED)
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(Map.of("id", user.getId())))
                .onErrorResume(e -> ServerResponse.badRequest()
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(Map.of("error", e.getMessage())));
    }
}

