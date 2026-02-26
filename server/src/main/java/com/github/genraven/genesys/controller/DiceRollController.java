package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.domain.campaign.encounter.dice.DiceRoll;
import com.github.genraven.genesys.domain.campaign.encounter.dice.DiceRollRequest;
import com.github.genraven.genesys.service.DiceRollService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Dice Roll Controller", description = "Endpoints for rolling and retrieving dice roll results")
public class DiceRollController extends AbstractController {

    private final DiceRollService diceRollService;

    @PostMapping(value = "/rolls", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Roll dice", description = "Perform a dice roll for a participant in an encounter and persist the result.")
    public Mono<ResponseEntity<DiceRoll>> rollDice(@Valid @RequestBody final DiceRollRequest request) {
        return diceRollService.rollDice(request)
                .map(roll -> ResponseEntity.created(getURI(roll.getId())).body(roll));
    }

    @GetMapping(value = "/rolls/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get roll by id", description = "Retrieve a specific dice roll by its id.")
    public Mono<ResponseEntity<DiceRoll>> getRoll(@PathVariable final String id) {
        return diceRollService.getRoll(id)
                .map(roll -> ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(roll))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping(value = "/encounters/{encounterId}/rolls", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get all rolls for an encounter", description = "Retrieve all dice rolls for a specific encounter, ordered by most recent.")
    public Mono<ResponseEntity<List<DiceRoll>>> getRollsByEncounter(@PathVariable final String encounterId) {
        return diceRollService.getRollsByEncounter(encounterId)
                .collectList()
                .map(rolls -> {
                    if (CollectionUtils.isEmpty(rolls)) {
                        return ResponseEntity.noContent().build();
                    }
                    return ResponseEntity.ok()
                            .contentType(MediaType.APPLICATION_JSON)
                            .body(rolls);
                });
    }

    @GetMapping(value = "/encounters/{encounterId}/rolls/round/{round}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get rolls by round", description = "Retrieve all dice rolls for a specific round within an encounter.")
    public Mono<ResponseEntity<List<DiceRoll>>> getRollsByRound(@PathVariable final String encounterId,
                                                                @PathVariable final int round) {
        return diceRollService.getRollsByEncounterAndRound(encounterId, round)
                .collectList()
                .map(rolls -> {
                    if (CollectionUtils.isEmpty(rolls)) {
                        return ResponseEntity.noContent().build();
                    }
                    return ResponseEntity.ok()
                            .contentType(MediaType.APPLICATION_JSON)
                            .body(rolls);
                });
    }

    @GetMapping(value = "/encounters/{encounterId}/participants/{participantId}/rolls", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get rolls by participant", description = "Retrieve all dice rolls made by a specific participant in an encounter.")
    public Mono<ResponseEntity<List<DiceRoll>>> getRollsByParticipant(@PathVariable final String encounterId,
                                                                      @PathVariable final String participantId) {
        return diceRollService.getRollsByEncounterAndParticipant(encounterId, participantId)
                .collectList()
                .map(rolls -> {
                    if (CollectionUtils.isEmpty(rolls)) {
                        return ResponseEntity.noContent().build();
                    }
                    return ResponseEntity.ok()
                            .contentType(MediaType.APPLICATION_JSON)
                            .body(rolls);
                });
    }

    @GetMapping(value = "/encounters/{encounterId}/rolls/initiative", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get initiative rolls", description = "Retrieve all initiative rolls for an encounter, ordered by most recent.")
    public Mono<ResponseEntity<List<DiceRoll>>> getInitiativeRolls(@PathVariable final String encounterId) {
        return diceRollService.getInitiativeRolls(encounterId)
                .collectList()
                .map(rolls -> {
                    if (CollectionUtils.isEmpty(rolls)) {
                        return ResponseEntity.noContent().build();
                    }
                    return ResponseEntity.ok()
                            .contentType(MediaType.APPLICATION_JSON)
                            .body(rolls);
                });
    }
}