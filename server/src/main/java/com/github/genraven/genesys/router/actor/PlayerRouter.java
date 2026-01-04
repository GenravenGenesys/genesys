package com.github.genraven.genesys.router.actor;

import com.github.genraven.genesys.domain.actor.player.Archetype;
import com.github.genraven.genesys.domain.actor.player.Career;
import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.actor.player.PlayerSkill;
import com.github.genraven.genesys.domain.talent.Talent;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import org.springdoc.core.annotations.RouterOperation;
import org.springdoc.core.annotations.RouterOperations;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.github.genraven.genesys.domain.actor.Characteristic;
import com.github.genraven.genesys.domain.response.PlayerResponse;
import com.github.genraven.genesys.handler.actor.PlayerHandler;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

import static com.github.genraven.genesys.router.ApiRoutes.*;

@Configuration
public class PlayerRouter {

    @Bean
    public RouterFunction<ServerResponse> playerRouterMethod(final PlayerHandler handler) {
        return RouterFunctions.route()
            .nest(RequestPredicates.path(API), builder -> builder
                .path("/campaigns/{name}", campaign -> campaign
                    .GET("/players/", handler::getAllPlayers)
                    .POST("/players/{playerName}", handler::createPlayer)
                )
            )
            .build();
    }
}
