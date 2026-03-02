package com.github.genraven.genesys.controller.campaign;

import com.github.genraven.genesys.domain.actor.player.Career;
import com.github.genraven.genesys.domain.actor.player.PlayerCharacter;
import com.github.genraven.genesys.service.CareerService;
import com.github.genraven.genesys.service.PlayerCharacterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/campaigns/{campaignId}/party/players")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Player Controller", description = "Management of player characters within a campaign's party. This includes creating, updating, and deleting player character profiles, as well as retrieving character details for display in the UI.")
@RequiredArgsConstructor
public class PlayerCharacterController {

    private final PlayerCharacterService playerCharacterService;

    @PostMapping(value = "/validate", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Validates a new Player Character", description = "Confirms that a new Player Character is set up correctly before being added to the campaign. This includes checks for required fields, valid career choices, and adherence to campaign-specific rules.")
    public Mono<ResponseEntity<PlayerCharacter>> validatePlayerCharacter(@PathVariable final String campaignId, @RequestBody final PlayerCharacter character) {
        return playerCharacterService.validatePlayerCharacter(character).map(ResponseEntity::ok);
    }

    @PatchMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Create a new Player Character", description = "Creates a new Player Character and adds it to the campaign's party. The request body should contain all necessary details for the character, including name, background, archetype, career, characteristics, and equipment.")
    public Mono<ResponseEntity<PlayerCharacter>> createPlayer(@PathVariable final String campaignId, @RequestBody final PlayerCharacter character) {
        return playerCharacterService.createPlayerCharacter(campaignId, character)
                .map(saved -> ResponseEntity.status(HttpStatus.CREATED).body(saved));
    }
}
