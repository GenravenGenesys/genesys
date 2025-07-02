package com.github.genraven.genesys.router;

import com.github.genraven.genesys.handler.ActorHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class ActorRouter {

    @Bean
    public RouterFunction<ServerResponse> actorRouterMethod(final ActorHandler actorHandler) {
        return RouterFunctions.route()
                .nest(RequestPredicates.path("/api"), builder -> builder
                        .path("/players", playerBuilder -> playerBuilder
                                .GET("/{name}", actorHandler::getPlayer)
                                .PUT("/{name}", actorHandler::updatePlayer)
                        )
                        .path("players/creation", playerCreationBuilder -> playerCreationBuilder
                                .PATCH("/{id}/careers/", actorHandler::updatePlayerCareer)
                                .PATCH("/{id}/careers/skills/", actorHandler::updatePlayerCareerSkills)
                                .PATCH("/{id}/archetypes/", actorHandler::updatePlayerArchetype)
                                .PATCH("/{id}/characteristics/{type}", actorHandler::updatePlayerCharacteristic)
                                .PATCH("/{id}/skills/", actorHandler::updatePlayerSkill)
                                .PATCH("/{id}/talents/", actorHandler::updatePlayerTalent)
                        )
                        //                .path("players/active", builder -> builder
                        //                        .PATCH("/{id}/skills/")
                        //                        .PATCH("/{id}/talents")
                        //                )
                        .path("/campaigns/{name}", campaignPlayerBuilder -> campaignPlayerBuilder
                                .GET("/players/", actorHandler::getAllPlayers)
                                .POST("/players/{playerName}", actorHandler::createPlayer)
                        )
                        .path("/nemeses", nemesisBuilder -> nemesisBuilder
                                .GET("/{name}", actorHandler::getNemesis)
                                .PUT("/{name}", actorHandler::updateNemesis)
                                .PATCH("/{id}/skills/", actorHandler::updateNemesisSkill)
                        )
                        .path("/campaigns/{name}", campaignNemesisBuilder -> campaignNemesisBuilder
                                .GET("/nemeses/", actorHandler::getAllNemeses)
                                .POST("/nemeses/{nemesisName}", actorHandler::createNemesis)
                        )
                        .path("/rivals", rivalBuilder -> rivalBuilder
                                .GET("/{id}", actorHandler::getRival)
                                .PUT("/{id}", actorHandler::updateRival)
                                .PATCH("/{id}/skills/", actorHandler::updateRivalSkill)
                        )
                        .path("/campaigns/{name}", campaignRivalBuilder -> campaignRivalBuilder
                                .GET("/rivals/", actorHandler::getAllRivals)
                                .POST("/rivals/{rivalName}", actorHandler::createRival)
                        )
                        .path("/minions", minionBuilder -> minionBuilder
                                .GET("/{id}", actorHandler::getMinion)
                                .PUT("/{id}", actorHandler::updateMinion)
                                .PATCH("/{id}/skills/", actorHandler::updateMinionSkill)
                        )
                        .path("/campaigns/{name}", campaignMinionBuilder -> campaignMinionBuilder
                                .GET("/minions/", actorHandler::getAllMinions)
                                .POST("/minions/{minionName}", actorHandler::createMinion)
                        )
                )
                .build();
    }
}