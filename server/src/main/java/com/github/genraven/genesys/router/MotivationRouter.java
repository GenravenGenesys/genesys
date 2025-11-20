package com.github.genraven.genesys.router;

import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.response.PlayerResponse;
import com.github.genraven.genesys.handler.InjuryHandler;
import com.github.genraven.genesys.handler.MotivationHandler;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springdoc.core.annotations.RouterOperation;
import org.springdoc.core.annotations.RouterOperations;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static com.github.genraven.genesys.router.ApiRoutes.PLAYER_BY_NAME;

@Configuration
public class MotivationRouter {

    @Bean
    @RouterOperations({
        @RouterOperation(
            path = PLAYER_BY_NAME,
            method = RequestMethod.GET,
            operation = @Operation(
                operationId = "getPlayer",
                summary = "Fetch a player by name",
                parameters = @Parameter(
                    name = "name",
                    in = ParameterIn.PATH,
                    required = true),
                responses = @ApiResponse(
                    responseCode = "200",
                    description = "Player found",
                    content = @Content(
                        schema = @Schema(
                            implementation = PlayerResponse.class))))),
        @RouterOperation(
            path = PLAYER_BY_NAME,
            method = RequestMethod.PUT,
            operation = @Operation(
                operationId = "updatePlayer",
                summary = "Update a player",
                parameters = @Parameter(
                    name = "name",
                    in = ParameterIn.PATH,
                    required = true),
                requestBody = @RequestBody(
                    content = @Content(
                        schema = @Schema(
                            implementation = Player.class))),
                responses = @ApiResponse(
                    responseCode = "200",
                    description = "Player updated",
                    content = @Content(
                        schema = @Schema(
                            implementation = PlayerResponse.class)))))
    })
    public RouterFunction<ServerResponse> motivationRouterMethod(final MotivationHandler handler) {
        return RouterFunctions.route()
            .nest(RequestPredicates.path("/api"), builder -> builder
                .path("/motivations", injuryBuilder -> injuryBuilder
                    .GET("/", handler::getAllInjuries)
                    .POST("/{name}", handler::createInjury)
                    .GET("/{name}", handler::getInjury)
                    .PUT("/{name}", handler::updateInjury)
                )
            )
            .build();
    }
}
