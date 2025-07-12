package com.github.genraven.genesys.router;

import com.github.genraven.genesys.handler.SceneHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class SceneRouter {

    @Bean
    public RouterFunction<ServerResponse> sceneRouterMethod(final SceneHandler sceneHandler) {
        return RouterFunctions.route()
            .nest(RequestPredicates.path("/api"), builder -> builder
                .path("/scenes", sceneBuilder -> sceneBuilder
                    .GET("/", sceneHandler::getAllScenes)
                    .POST("/{name}", sceneHandler::createScene)
                    .GET("/{name}", sceneHandler::getScene)
                    .PUT("/{name}", sceneHandler::updateScene)
                )
                .path("/scenes/{id}/minions/enemies", minionBuilder -> minionBuilder
                    .GET("/", sceneHandler::getEnemyMinions)
                    .POST("/{size}", sceneHandler::addEnemyMinionToScene)
                )
                .path("/scenes/{id}/rivals/enemies", rivalBuilder -> rivalBuilder
                    .GET("/", sceneHandler::getEnemyRivals)
                    .POST("/", sceneHandler::addEnemyRivalToScene)
                )
                .path("/scenes/{id}/nemeses/enemies", nemesisBuilder -> nemesisBuilder
                    .GET("/", sceneHandler::getEnemyNemeses)
                    .POST("/", sceneHandler::addEnemyNemesisToScene)
                )
                .path("campaigns/scenes/", campaignSceneBuilder -> campaignSceneBuilder
                    .GET(sceneHandler::getScenesForCurrentCampaign)
                    .POST(sceneHandler::addSceneToCurrentCampaign)
                )
                .path("/scenes/{sceneId}/encounters/{encounterId}", sceneEncounterBuilder -> sceneEncounterBuilder
                    .GET("/player-characters", sceneHandler::getPlayerCharacters)
                    .GET("/non-player-characters", sceneHandler::getNonPlayerCharacters)
                )
            )
            .build();
    }
}
