package com.github.genraven.genesys.router.actor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.github.genraven.genesys.handler.actor.PlayerHandler;

@Configuration
public class PlayerRouter {

    @Bean
    public RouterFunction<ServerResponse> playerRouterMethod(final PlayerHandler handler) {
        return RouterFunctions.route()
                .nest(RequestPredicates.path("/api"), builder -> builder
                        .path("/players", playerBuilder -> playerBuilder
                                .GET("/{name}", handler::getPlayer)
                                .PUT("/{name}", handler::updatePlayer))
                        .path("players/creation", playerCreationBuilder -> playerCreationBuilder
                                .PATCH("/{id}/careers/", handler::updatePlayerCareer)
                                .PATCH("/{id}/careers/skills/",
                                        handler::updatePlayerCareerSkills)
                                .PATCH("/{id}/archetypes/",
                                        handler::updatePlayerArchetype)
                                .PATCH("/{id}/characteristics/",
                                        handler::updatePlayerCharacteristic)
                                .PATCH("/{id}/skills/", handler::updatePlayerSkill)
                                .PATCH("/{id}/talents/", handler::updatePlayerTalent))
                        .path("/campaigns/{name}", campaignPlayerBuilder -> campaignPlayerBuilder
                                .GET("/players/", handler::getAllPlayers)
                                .POST("/players/{playerName}", handler::createPlayer)))
                .build();
    }
}
