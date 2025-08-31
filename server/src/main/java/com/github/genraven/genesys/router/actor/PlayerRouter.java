package com.github.genraven.genesys.router.actor;

import com.github.genraven.genesys.domain.actor.player.Archetype;
import com.github.genraven.genesys.domain.actor.player.Career;
import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.actor.player.PlayerSkill;
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
                            implementation = PlayerResponse.class))))),
        @RouterOperation(
            path = CAREERS,
            method = RequestMethod.PATCH,
            operation = @Operation(
                operationId = "updatePlayerCareer",
                parameters = @Parameter(
                    name = "id",
                    in = ParameterIn.PATH),
                requestBody = @RequestBody(
                    content = @Content(
                        schema = @Schema(
                            implementation = Career.class))),
                responses = @ApiResponse(
                    responseCode = "200",
                    description = "Career updated",
                    content = @Content(
                        schema = @Schema(
                            implementation = PlayerResponse.class))))),
        @RouterOperation(
            path = CAREER_SKILLS,
            method = RequestMethod.PATCH,
            operation = @Operation(
                operationId = "updatePlayerCareerSkills",
                parameters = @Parameter(
                    name = "id",
                    in = ParameterIn.PATH),
                requestBody = @RequestBody(
                    content = @Content(
                        array = @ArraySchema(
                            schema = @Schema(
                                implementation = PlayerSkill.class)))),
                responses = @ApiResponse(
                    responseCode = "200",
                    description = "Career skills updated",
                    content = @Content(
                        schema = @Schema(
                            implementation = PlayerResponse.class))))),
        @RouterOperation(
            path = CREATION_ARCHETYPES,
            method = RequestMethod.PATCH,
            operation = @Operation(
                operationId = "updatePlayerArchetype",
                parameters = @Parameter(
                    name = "id",
                    in = ParameterIn.PATH),
                requestBody = @RequestBody(
                    content = @Content(
                        schema = @Schema(
                            implementation = Archetype.class))),
                responses = @ApiResponse(
                    responseCode = "204",
                    description = "Archetype updated",
                    content = @Content(
                        schema = @Schema(
                            implementation = PlayerResponse.class))))),
        @RouterOperation(
            path = CREATION_CHARACTERISTICS,
            method = RequestMethod.PATCH,
            operation = @Operation(
                operationId = "updatePlayerCharacteristic",
                parameters = @Parameter(
                    name = "id",
                    in = ParameterIn.PATH),
                requestBody = @RequestBody(
                    description = "The characteristic to be updated.",
                    required = true,
                    content = @Content(
                        schema = @Schema(
                            implementation = Characteristic.class),
                        mediaType = MediaType.APPLICATION_JSON_VALUE)),
                responses = @ApiResponse(
                    responseCode = "200",
                    description = "Characteristics updated",
                    content = @Content(
                        schema = @Schema(
                            implementation = PlayerResponse.class))))),
        // @RouterOperation(path = SKILLS, method = RequestMethod.PATCH, operation =
        // @Operation(operationId = "updatePlayerSkill", parameters = @Parameter(name =
        // "id", in = ParameterIn.PATH), requestBody = @RequestBody(content =
        // @Content(schema = @Schema(implementation = SkillUpdateRequest.class))),
        // responses = @ApiResponse(responseCode = "204", description = "Skills
        // updated"))),
        // @RouterOperation(path = TALENTS, method = RequestMethod.PATCH, operation =
        // @Operation(operationId = "updatePlayerTalent", parameters = @Parameter(name =
        // "id", in = ParameterIn.PATH), requestBody = @RequestBody(content =
        // @Content(schema = @Schema(implementation = TalentUpdateRequest.class))),
        // responses = @ApiResponse(responseCode = "204", description = "Talents
        // updated"))),
        // @RouterOperation(path = CAMPAIGN_PLAYERS, method = RequestMethod.GET,
        // operation = @Operation(operationId = "getAllPlayers", summary = "Retrieve all
        // players in a campaign", parameters = @Parameter(name = "name", in =
        // ParameterIn.PATH, required = true), responses = @ApiResponse(responseCode =
        // "200", description = "List of players", content = @Content(array =
        // @ArraySchema(schema = @Schema(implementation = CharacterDTO.class)))))),
        // @RouterOperation(path = CREATE_PLAYER, method = RequestMethod.POST, operation
        // = @Operation(operationId = "createPlayer", parameters = {
        // @Parameter(name = "name", in = ParameterIn.PATH),
        // @Parameter(name = "playerName", in = ParameterIn.PATH)
        // }, responses = @ApiResponse(responseCode = "201", description = "Player
        // created", content = @Content(schema = @Schema(implementation =
        // CharacterDTO.class)))))
    })
    public RouterFunction<ServerResponse> playerRouterMethod(final PlayerHandler handler) {
        return RouterFunctions.route()
            .nest(RequestPredicates.path(API), builder -> builder
                .path(PLAYERS, player -> player
                    .GET(ID, handler::getPlayer)
                    .PUT(NAME, handler::updatePlayer)
                )
                .path("/players/creation", creation -> creation
                    .PATCH("/{id}/careers/", handler::updatePlayerCareer)
                    .PATCH("/{id}/careers/skills/",
                        handler::updatePlayerCareerSkills)
                    .PATCH("/{id}/archetypes/",
                        handler::updatePlayerArchetype)
                    .PATCH("/{id}/characteristics/",
                        handler::updatePlayerCharacteristic)
                    .PATCH("/{id}/skills/", handler::updatePlayerSkill)
                    .PATCH("/{id}/talents/", handler::updatePlayerTalent)
                    .POST("/{id}/reset/", handler::resetExperience)
                    .POST("/{id}/lock", handler::lockPlayerCreation)
                )
                .path("/campaigns/{name}", campaign -> campaign
                    .GET("/players/", handler::getAllPlayers)
                    .POST("/players/{playerName}", handler::createPlayer)
                )
            )
            .build();
    }
}
