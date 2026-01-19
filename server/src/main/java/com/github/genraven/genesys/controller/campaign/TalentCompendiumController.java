package com.github.genraven.genesys.controller.campaign;

import com.github.genraven.genesys.domain.talent.Talent;
import com.github.genraven.genesys.service.TalentService;
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
@RequestMapping("/api/campaigns/{campaignId}/compendium/talents")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Talents", description = "Management of the campaign's custom talent library")
@RequiredArgsConstructor
public class TalentCompendiumController {

    private final TalentService talentService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get all talent templates", description = "Retrieves the full library of talents for this setting")
    public Flux<Talent> getTalents(@PathVariable final String campaignId) {
        return talentService.findAllByCampaignId(campaignId);
    }

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Create a new talent", description = "Adds a custom talent definition to the campaign library")
    public Mono<ResponseEntity<Talent>> createTalent(@PathVariable final String campaignId, @RequestBody final Talent newTalent) {
        return talentService.addTalent(campaignId, newTalent)
            .map(saved -> ResponseEntity.status(HttpStatus.CREATED).body(saved));
    }

    @PatchMapping(value = "/{talentId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Update a talent", description = "Performs a partial update on a specific talent template")
    public Mono<ResponseEntity<Talent>> updateTalent(@PathVariable final String campaignId, @PathVariable final String talentId,
                                                   @RequestBody final Talent updatedTalent) {
        return talentService.updateTalent(campaignId, talentId, updatedTalent)
            .map(ResponseEntity::ok)
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
