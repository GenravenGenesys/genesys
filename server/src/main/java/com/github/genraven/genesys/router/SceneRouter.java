package com.github.genraven.genesys.router;

import com.github.genraven.genesys.handler.SceneHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class SceneRouter {

    @Bean
    public RouterFunction<ServerResponse> sceneRouterMethod(final SceneHandler sceneHandler) {
        return RouterFunctions.route()
                .path("/scenes", builder -> builder
                        .GET("/", sceneHandler::getAllScenes)
                        .POST("/{name}", sceneHandler::createScene)
                        .GET("/{name}", sceneHandler::getScene)
                        .PUT("/{name}", sceneHandler::updateScene)
                )
                .path("/scenes/{id}/rivals/enemies", builder -> builder
                        .GET("/", sceneHandler::getEnemyRivals)
                        .POST("/",sceneHandler::addEnemyRivalToScene)
                )
                .path("campaigns/scenes/", builder -> builder
                        .GET(sceneHandler::getScenesForCurrentCampaign)
                        .POST(sceneHandler::addSceneToCurrentCampaign)
                )
                .build();
    }
}