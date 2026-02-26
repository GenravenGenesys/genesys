package com.github.genraven.genesys.controller.campaign;

import com.github.genraven.genesys.domain.CriticalInjury;
import com.github.genraven.genesys.service.InjuryService;
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
@RequestMapping("/api/campaigns/{campaignId}/compendium/injuries")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Injuries", description = "Management of the campaign's custom injury library")
@RequiredArgsConstructor
public class InjuryCompendiumController {

    private final InjuryService criticalInjuryService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get all criticalInjury templates", description = "Retrieves the full library of qualities for this setting")
    public Flux<CriticalInjury> getQualities(@PathVariable final String campaignId) {
        return criticalInjuryService.findAllByCampaignId(campaignId);
    }

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Create a new criticalInjury", description = "Adds a custom criticalInjury definition to the campaign library")
    public Mono<ResponseEntity<CriticalInjury>> createCriticalInjury(@PathVariable final String campaignId, @RequestBody final CriticalInjury newCriticalInjury) {
        return criticalInjuryService.addCriticalInjury(campaignId, newCriticalInjury)
                .map(saved -> ResponseEntity.status(HttpStatus.CREATED).body(saved));
    }

    @PatchMapping(value = "/{criticalInjuryId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Update a criticalInjury", description = "Performs a partial update on a specific criticalInjury template")
    public Mono<ResponseEntity<CriticalInjury>> updateCriticalInjury(@PathVariable final String campaignId, @PathVariable final String criticalInjuryId,
                                                                     @RequestBody final CriticalInjury updatedCriticalInjury) {
        return criticalInjuryService.updateCriticalInjury(campaignId, criticalInjuryId, updatedCriticalInjury)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
