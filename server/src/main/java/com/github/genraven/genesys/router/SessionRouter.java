package com.github.genraven.genesys.router;

import com.github.genraven.genesys.handler.SessionHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class SessionRouter {

    @Bean
    public RouterFunction<ServerResponse> sceneRouterMethod(final SessionHandler sessionHandler) {
        return RouterFunctions.route()
            .nest(RequestPredicates.path(ApiRoutes.API), builder -> builder
                .path("campaigns/sessions/{name}/scenes", sessionSceneBuilder -> sessionSceneBuilder
                    .GET("/", sessionHandler::getScenesFromSession)
                    .POST("/{id}", sessionHandler::addSceneToSessionInCurrentCampaign)
                    .PATCH("/{id}", sessionHandler::startScene)
                )
            )
            .build();
    }
}
