package com.github.genraven.genesys.router;

import com.github.genraven.genesys.handler.ActorHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class ActorRouter {

    @Bean
    public RouterFunction<ServerResponse> actorRouterMethod(final ActorHandler actorHandler) {
        return RouterFunctions.route()
                .path("/players", builder -> builder
                        .GET("/{name}", actorHandler::getPlayer)
                        .PUT("/{name}", actorHandler::updatePlayer)
                )
                .path("players/creation", builder -> builder
                        .PATCH("/{id}/careers/", actorHandler::updatePlayerCareer)
                        .PATCH("/{id}/careers/skills/", actorHandler::updatePlayerCareerSkills)
                        .PATCH("/{id}/archetypes/", actorHandler::updatePlayerArchetype)
                        .PATCH("/{id}/characteristics/", actorHandler::updatePlayerCharacteristic)
                        .PATCH("/{id}/skills/", actorHandler::updatePlayerSkill)
                        .PATCH("/{id}/talents/", actorHandler::updatePlayerTalent)
                )
//                .path("players/active", builder -> builder
//                        .PATCH("/{id}/skills/")
//                        .PATCH("/{id}/talents")
//                )
                .path("/campaigns/{name}", builder -> builder
                        .GET("/players/", actorHandler::getAllPlayers)
                        .POST("/players/{playerName}", actorHandler::createPlayer)
                )
                .path("/nemeses", builder -> builder
                        .GET("/{name}", actorHandler::getNemesis)
                        .PUT("/{name}", actorHandler::updateNemesis)
                        .PATCH("/{id}/skills/", actorHandler::updateNemesisSkill)
                )
                .path("/campaigns/{name}", builder -> builder
                        .GET("/nemeses/", actorHandler::getAllNemeses)
                        .POST("/nemeses/{nemesisName}", actorHandler::createNemesis)
                )
                .path("/rivals", builder -> builder
                        .GET("/{id}", actorHandler::getRival)
                        .PUT("/{id}", actorHandler::updateRival)
                        .PATCH("/{id}/skills/", actorHandler::updateRivalSkill)
                )
                .path("/campaigns/{name}", builder -> builder
                        .GET("/rivals/", actorHandler::getAllRivals)
                        .POST("/rivals/{rivalName}", actorHandler::createRival)
                )
                .path("/minions", builder -> builder
                        .GET("/{id}", actorHandler::getMinion)
                        .PUT("/{id}", actorHandler::updateMinion)
                        .PATCH("/{id}/skills/", actorHandler::updateMinionSkill)
                )
                .path("/campaigns/{name}", builder -> builder
                        .GET("/minions/", actorHandler::getAllMinions)
                        .POST("/minions/{minionName}", actorHandler::createMinion)
                )
                .build();
    }
}