package com.github.genraven.genesys.controller.campaign;

import com.github.genraven.genesys.domain.actor.player.Archetype;
import com.github.genraven.genesys.service.ArchetypeService;
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
@RequestMapping("/api/campaigns/{campaignId}/compendium/archetypes")
@Tag(name = "Archetypes", description = "Management of the campaign's custom archetype library")
@RequiredArgsConstructor
public class ArchetypeCompendiumController {

    private final ArchetypeService archetypeService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get all archetype templates", description = "Retrieves the full library of archetype for this setting")
    public Flux<Archetype> getArchetype(@PathVariable final String campaignId) {
        return archetypeService.findAllByCampaignId(campaignId);
    }

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Create a new archetype", description = "Adds a custom archetype definition to the campaign library")
    public Mono<ResponseEntity<Archetype>> createArchetype(@PathVariable final String campaignId, @RequestBody final Archetype newArchetype) {
        return archetypeService.addArchetype(campaignId, newArchetype)
            .map(saved -> ResponseEntity.status(HttpStatus.CREATED).body(saved));
    }

    @PatchMapping(value = "/{archetypeId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Update a archetype", description = "Performs a partial update on a specific archetype")
    public Mono<ResponseEntity<Archetype>> updateArchetype(@PathVariable final String campaignId, @PathVariable final String archetypeId,
                                                           @RequestBody final Archetype updatedArchetype) {
        return archetypeService.updateArchetype(campaignId, archetypeId, updatedArchetype)
            .map(ResponseEntity::ok)
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
