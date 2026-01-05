package com.github.genraven.genesys.controller.campaign;

import com.github.genraven.genesys.controller.AbstractController;
import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.service.CampaignService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Campaign Controller", description = "Endpoints for managing campaigns")
public class CampaignController extends AbstractController {
    
    private final CampaignService campaignService;

    @GetMapping("/")
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

    @GetMapping("/{id}")
    @Operation(summary = "Get campaign by id", description = "Retrieve a specific campaign by its name.")
    public Mono<ResponseEntity<Campaign>> getCampaign(@PathVariable final String id) {
        return campaignService.getCampaign(id)
            .map(campaign -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(campaign))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping("/{name}")
    @Operation(summary = "Create a new campaign", description = "Create a new campaign with the specified name.")
    public Mono<ResponseEntity<Campaign>> createCampaign(@PathVariable final String name) {
        return campaignService.createCampaign(name)
            .map(campaign -> ResponseEntity.created(getURI(campaign.getName())).body(campaign));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing campaign", description = "Update the details of an existing campaign.")
    public Mono<ResponseEntity<Campaign>> updateCampaign(@PathVariable final String id, @RequestBody final Campaign campaign) {
        return campaignService.updateCampaign(id, campaign)
            .map(sk -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(sk))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
