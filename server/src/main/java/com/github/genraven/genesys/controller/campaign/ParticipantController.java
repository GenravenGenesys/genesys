package com.github.genraven.genesys.controller.campaign;

import com.github.genraven.genesys.domain.actor.player.PlayerCharacter;
import com.github.genraven.genesys.domain.campaign.encounter.Participant;
import com.github.genraven.genesys.service.ParticipantService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/participants")
@Tag(name = "Participant Controller", description = "Operations for converting characters into encounter participants.")
@RequiredArgsConstructor
public class ParticipantController {

    private final ParticipantService participantService;

    @PostMapping(value = "/from-player", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
        summary = "Convert a Player Character to a Participant",
        description = "Accepts a PlayerCharacter from the UI and returns a Participant object ready to be added to an encounter."
    )
    public Mono<ResponseEntity<Participant>> fromPlayerCharacter(@RequestBody final PlayerCharacter playerCharacter) {
        return participantService.convertPlayerCharacterToParticipant(playerCharacter)
            .map(ResponseEntity::ok)
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping(value = "/from-adversary/{campaignId}/{adversaryId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
        summary = "Convert an Adversary Template to a Participant",
        description = "Fetches an adversary template by ID from the given campaign's compendium and returns a Participant object ready to be added to an encounter."
    )
    public Mono<ResponseEntity<Participant>> fromAdversaryTemplate(@PathVariable final String campaignId,
                                                                   @PathVariable final String adversaryId) {
        return participantService.convertAdversaryTemplateToParticipant(campaignId, adversaryId)
            .map(ResponseEntity::ok)
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}


