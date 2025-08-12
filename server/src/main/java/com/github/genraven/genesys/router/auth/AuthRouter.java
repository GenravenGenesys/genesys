package com.github.genraven.genesys.router.auth;

import com.github.genraven.genesys.handler.auth.AuthHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.*;

@Configuration
public class AuthRouter {

    @Bean
    public RouterFunction<ServerResponse> authRoutes(final AuthHandler handler) {
        return RouterFunctions.route()
                .POST("/auth/login", handler::login)
                .POST("/auth/signup", handler::signup)
                .build();
    }
}

