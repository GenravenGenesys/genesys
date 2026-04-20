package com.github.genraven.genesys.controller.campaign;

import com.github.genraven.genesys.domain.actor.adversary.AdversaryTemplate;
import com.github.genraven.genesys.service.AdversaryService;
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
@RequestMapping("/api/campaigns/{campaignId}/compendium/adversaries")
@Tag(name = "Adversaries", description = "Management of the campaign's custom adversary library")
@RequiredArgsConstructor
public class AdversaryCompendiumController {

    private final AdversaryService adversaryService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get all adversary templates", description = "Retrieves the full library of adversaries for this setting")
    public Flux<AdversaryTemplate> getAdversaries(@PathVariable final String campaignId) {
        return adversaryService.findAllByCampaignId(campaignId);
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Create a new adversary", description = "Adds a custom adversary definition to the campaign library")
    public Mono<ResponseEntity<AdversaryTemplate>> createAdversary(@PathVariable final String campaignId, @RequestBody final AdversaryTemplate newAdversary) {
        return adversaryService.addAdversary(campaignId, newAdversary)
            .map(saved -> ResponseEntity.status(HttpStatus.CREATED).body(saved));
    }

    @PatchMapping(value = "/{adversaryId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Update a adversary", description = "Performs a partial update on a specific adversary template")
    public Mono<ResponseEntity<AdversaryTemplate>> updateAdversary(@PathVariable final String campaignId, @PathVariable final String adversaryId,
                                                                   @RequestBody final AdversaryTemplate updatedAdversary) {
        return adversaryService.updateAdversary(campaignId, adversaryId, updatedAdversary)
            .map(ResponseEntity::ok)
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
