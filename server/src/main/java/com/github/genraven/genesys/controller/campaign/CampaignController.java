package com.github.genraven.genesys.controller.campaign;

import com.github.genraven.genesys.configuration.TemplateCache;
import com.github.genraven.genesys.controller.AbstractController;
import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.domain.campaign.CampaignCompendium;
import com.github.genraven.genesys.service.CampaignService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
@RequiredArgsConstructor
@Tag(name = "Campaign Controller", description = "Endpoints for managing campaigns")
public class CampaignController extends AbstractController {
    
    private final CampaignService campaignService;
    private final TemplateCache templateCache;

    @GetMapping(value = "/{id}/compendium", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<CampaignCompendium> getCampaignCompendium(@PathVariable final String id) {
        return campaignService.getCampaignCompendium(id);
    }

    @PostMapping("/{id}/open")
    public Mono<ResponseEntity<String>> openCampaign(@PathVariable String id) {
        templateCache.loadCampaign(id);

        return Mono.just(ResponseEntity.ok("Campaign " + id + " is now active and cached."));
    }

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get all campaigns", description = "Retrieve a list of all campaigns.")
    public Mono<ResponseEntity<List<Campaign>>> getAllCampaigns() {
        return campaignService.getAllCampaigns()
            .collectList()
            .map(campaigns -> {
                if (CollectionUtils.isEmpty(campaigns)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(campaigns);
            });
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get campaign by id", description = "Retrieve a specific campaign by its name.")
    public Mono<ResponseEntity<Campaign>> getCampaign(@PathVariable final String id) {
        return campaignService.getCampaign(id)
            .map(campaign -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(campaign))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Create a new campaign", description = "Create a new campaign with the specified name.")
    public Mono<ResponseEntity<Campaign>> createCampaign(@RequestBody final Campaign campaign) {
        return campaignService.createCampaign(campaign)
            .map(newCampaign -> ResponseEntity.created(getURI(newCampaign.getName())).body(newCampaign));
    }
}
