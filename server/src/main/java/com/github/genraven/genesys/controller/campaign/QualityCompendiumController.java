package com.github.genraven.genesys.controller.campaign;

import com.github.genraven.genesys.domain.quality.Quality;
import com.github.genraven.genesys.service.QualityService;
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
@RequestMapping("/api/campaigns/{campaignId}/compendium/qualities")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Qualities", description = "Management of the campaign's custom quality library")
@RequiredArgsConstructor
public class QualityCompendiumController {

    private final QualityService qualityService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get all quality templates", description = "Retrieves the full library of qualities for this setting")
    public Flux<Quality> getQualities(@PathVariable final String campaignId) {
        return qualityService.findAllByCampaignId(campaignId);
    }

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Create a new quality", description = "Adds a custom quality definition to the campaign library")
    public Mono<ResponseEntity<Quality>> createQuality(@PathVariable final String campaignId, @RequestBody final Quality newQuality) {
        return qualityService.addQuality(campaignId, newQuality)
            .map(saved -> ResponseEntity.status(HttpStatus.CREATED).body(saved));
    }

    @PatchMapping(value = "/{qualityId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Update a quality", description = "Performs a partial update on a specific quality template")
    public Mono<ResponseEntity<Quality>> updateQuality(@PathVariable final String campaignId, @PathVariable final String qualityId,
                                                       @RequestBody final Quality updatedQuality) {
        return qualityService.updateQuality(campaignId, qualityId, updatedQuality)
            .map(ResponseEntity::ok)
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
