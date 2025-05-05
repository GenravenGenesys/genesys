package com.github.genraven.genesys.router;

import com.github.genraven.genesys.handler.ModifierHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class ModifierRouter {
    @Bean
    public RouterFunction<ServerResponse> modifierRouterMethod(final ModifierHandler modifierHandler) {
        return RouterFunctions.route().path("/api/modifiers", builder -> builder.GET(modifierHandler::getModifiers)).build();
    }
}
