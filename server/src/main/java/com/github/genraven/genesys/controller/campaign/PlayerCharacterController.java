package com.github.genraven.genesys.controller.campaign;

import com.github.genraven.genesys.domain.actor.player.Career;
import com.github.genraven.genesys.service.CareerService;
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

    private final CareerService careerService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get all players", description = "Retrieves the full library of career for this setting")
    public Flux<Career> getCareer(@PathVariable final String campaignId) {
        return careerService.findAllByCampaignId(campaignId);
    }

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Create a new career", description = "Adds a custom career definition to the campaign library")
    public Mono<ResponseEntity<Career>> createCareer(@PathVariable final String campaignId, @RequestBody final Career newCareer) {
        return careerService.addCareer(campaignId, newCareer)
            .map(saved -> ResponseEntity.status(HttpStatus.CREATED).body(saved));
    }

    @PatchMapping(value = "/{careerId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Update a career", description = "Performs a partial update on a specific career")
    public Mono<ResponseEntity<Career>> updateCareer(@PathVariable final String campaignId, @PathVariable final String careerId,
                                                     @RequestBody final Career updatedCareer) {
        return careerService.updateCareer(campaignId, careerId, updatedCareer)
            .map(ResponseEntity::ok)
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
