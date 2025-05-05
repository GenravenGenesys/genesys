package com.github.genraven.genesys.router;

import com.github.genraven.genesys.handler.InjuryHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class InjuryRouter {

    @Bean
    public RouterFunction<ServerResponse> injuryRouterMethod(final InjuryHandler injuryHandler) {
        return RouterFunctions.route()
                .nest(RequestPredicates.path("/api"), builder -> builder
                        .path("/injuries", injuryBuilder -> injuryBuilder
                                .GET("/", injuryHandler::getAllInjuries)
                                .POST("/{name}", injuryHandler::createInjury)
                                .GET("/{name}", injuryHandler::getInjury)
                                .PUT("/{name}", injuryHandler::updateInjury)
                        )
                )
                .build();
    }
}
