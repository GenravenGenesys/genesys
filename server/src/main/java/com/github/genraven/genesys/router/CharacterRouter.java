package com.github.genraven.genesys.router;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.github.genraven.genesys.handler.CharacterHandler;

@Configuration
public class CharacterRouter {

    @Bean
    RouterFunction<ServerResponse> characterRouterMethod(final CharacterHandler handler) {
        return RouterFunctions.route()
                .nest(RequestPredicates.path("/api"), builder -> builder
                        .path("/characters", characterBuilder -> characterBuilder
                                .GET("/players", handler::getPlayer)))
                .build();
    }
}
