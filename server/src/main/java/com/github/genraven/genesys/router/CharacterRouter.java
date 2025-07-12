package com.github.genraven.genesys.router;

import static com.github.genraven.genesys.router.ApiRoutes.API;
import static com.github.genraven.genesys.router.ApiRoutes.CHARACTERS;
import static com.github.genraven.genesys.router.ApiRoutes.PLAYERS;

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

import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.response.CharacterResponse;
import com.github.genraven.genesys.handler.CharacterHandler;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@Configuration
public class CharacterRouter {

    @RouterOperations({
        @RouterOperation(
            path = API + CHARACTERS + PLAYERS,
            produces = {
                MediaType.APPLICATION_JSON_VALUE},
            method = RequestMethod.GET,
            beanClass = CharacterHandler.class,
            beanMethod = "getPlayer",
            operation = @Operation(
                operationId = "getPlayer",
                summary = "Get all player characters",
                tags = {"Character"},
                requestBody = @RequestBody(
                    description = "List of Player objects to transform",
                    required = true,
                    content = @Content(
                        array = @ArraySchema(
                            schema = @Schema(
                                implementation = Player.class)),
                        mediaType = MediaType.APPLICATION_JSON_VALUE)),
                responses = {
                    @ApiResponse(
                        responseCode = "200",
                        description = "Successful retrieval of players",
                        content = @Content(
                            array = @ArraySchema(
                                schema = @Schema(
                                    implementation = CharacterResponse.class)))),
                    @ApiResponse(
                        responseCode = "204",
                        description = "No Players Found")
                }))
    })
    @Bean
    RouterFunction<ServerResponse> characterRouterMethod(final CharacterHandler handler) {
        return RouterFunctions.route()
            .nest(RequestPredicates.path(API), builder -> builder
                .path(CHARACTERS, characterBuilder -> characterBuilder
                    .GET(PLAYERS, handler::getPlayer)))
            .build();
    }
}
