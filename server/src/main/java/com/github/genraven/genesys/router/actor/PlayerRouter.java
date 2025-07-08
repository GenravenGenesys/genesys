package com.github.genraven.genesys.router.actor;

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

import com.github.genraven.genesys.handler.actor.PlayerHandler;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@Configuration
public class PlayerRouter {

    @Bean
    @RouterOperations({
            // GET /players/{name}
            @RouterOperation(path = "/api/players/{name}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE, operation = @Operation(operationId = "getPlayer", summary = "Get a player by name", parameters = {
                    @Parameter(name = "name", in = ParameterIn.PATH, required = true, description = "Player name")
            }, responses = {
                    @ApiResponse(responseCode = "200", description = "Player data", content = @Content(schema = @Schema(implementation = CharacterDTO.class)))
            })),
            // PUT /players/{name}
            @RouterOperation(path = "/api/players/{name}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE, operation = @Operation(operationId = "updatePlayer", summary = "Update a player by name", parameters = {
                    @Parameter(name = "name", in = ParameterIn.PATH, required = true)
            }, requestBody = @RequestBody(required = true, content = @Content(schema = @Schema(implementation = CharacterDTO.class))), responses = {
                    @ApiResponse(responseCode = "200", description = "Updated player returned", content = @Content(schema = @Schema(implementation = CharacterDTO.class)))
            })),
            // PATCH creation steps
            @RouterOperation(path = "/api/players/creation/{id}/careers/", method = RequestMethod.PATCH, operation = @Operation(operationId = "updatePlayerCareer", summary = "Update a player's career during creation", parameters = {
                    @Parameter(name = "id", in = ParameterIn.PATH, required = true) }, requestBody = @RequestBody(required = true, content = @Content(schema = @Schema(implementation = CareerUpdateRequest.class))), responses = {
                            @ApiResponse(responseCode = "204", description = "Career updated") })),
            @RouterOperation(path = "/api/players/creation/{id}/careers/skills/", method = RequestMethod.PATCH, operation = @Operation(operationId = "updatePlayerCareerSkills", summary = "Update a player's career skills during creation", parameters = {
                    @Parameter(name = "id", in = ParameterIn.PATH, required = true) }, requestBody = @RequestBody(required = true, content = @Content(schema = @Schema(implementation = SkillListRequest.class))), responses = {
                            @ApiResponse(responseCode = "204", description = "Career skills updated") })),
            @RouterOperation(path = "/api/players/creation/{id}/archetypes/", method = RequestMethod.PATCH, operation = @Operation(operationId = "updatePlayerArchetype", summary = "Update a player's archetype during creation", parameters = {
                    @Parameter(name = "id", in = ParameterIn.PATH, required = true) }, requestBody = @RequestBody(required = true, content = @Content(schema = @Schema(implementation = ArchetypeRequest.class))), responses = {
                            @ApiResponse(responseCode = "204", description = "Archetype updated") })),
            @RouterOperation(path = "/api/players/creation/{id}/characteristics/", method = RequestMethod.PATCH, operation = @Operation(operationId = "updatePlayerCharacteristic", summary = "Update a player's characteristics", parameters = {
                    @Parameter(name = "id", in = ParameterIn.PATH, required = true) }, requestBody = @RequestBody(required = true, content = @Content(schema = @Schema(implementation = CharacteristicUpdateRequest.class))), responses = {
                            @ApiResponse(responseCode = "204", description = "Characteristics updated") })),
            @RouterOperation(path = "/api/players/creation/{id}/skills/", method = RequestMethod.PATCH, operation = @Operation(operationId = "updatePlayerSkill", summary = "Update player skills manually", parameters = {
                    @Parameter(name = "id", in = ParameterIn.PATH, required = true) }, requestBody = @RequestBody(required = true, content = @Content(schema = @Schema(implementation = SkillUpdateRequest.class))), responses = {
                            @ApiResponse(responseCode = "204", description = "Skills updated") })),
            @RouterOperation(path = "/api/players/creation/{id}/talents/", method = RequestMethod.PATCH, operation = @Operation(operationId = "updatePlayerTalent", summary = "Add or remove player talents", parameters = {
                    @Parameter(name = "id", in = ParameterIn.PATH, required = true) }, requestBody = @RequestBody(required = true, content = @Content(schema = @Schema(implementation = TalentUpdateRequest.class))), responses = {
                            @ApiResponse(responseCode = "204", description = "Talents updated") })),
            // GET all players in campaign
            @RouterOperation(path = "/api/campaigns/{name}/players/", method = RequestMethod.GET, operation = @Operation(operationId = "getAllPlayers", summary = "Retrieve all players in a campaign", parameters = {
                    @Parameter(name = "name", in = ParameterIn.PATH, required = true) }, responses = {
                            @ApiResponse(responseCode = "200", description = "List of players", content = @Content(array = @ArraySchema(schema = @Schema(implementation = CharacterDTO.class))))
                    })),
            // POST create player
            @RouterOperation(path = "/api/campaigns/{name}/players/{playerName}", method = RequestMethod.POST, operation = @Operation(operationId = "createPlayer", summary = "Create a new player in a campaign", parameters = {
                    @Parameter(name = "name", in = ParameterIn.PATH, required = true),
                    @Parameter(name = "playerName", in = ParameterIn.PATH, required = true)
            }, responses = {
                    @ApiResponse(responseCode = "201", description = "Player created", content = @Content(schema = @Schema(implementation = CharacterDTO.class)))
            }))
    })
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
                        .path("/campaigns/{name}",
                                campaignPlayerBuilder -> campaignPlayerBuilder
                                        .GET("/players/",
                                                handler::getAllPlayers)
                                        .POST("/players/{playerName}",
                                                handler::createPlayer)))
                .build();
    }
}
