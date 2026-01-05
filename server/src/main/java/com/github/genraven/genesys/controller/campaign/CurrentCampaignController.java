package com.github.genraven.genesys.controller.campaign;

import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.service.CampaignService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/current")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Current Campaign Controller", description = "Endpoints for managing current campaign")
public class CurrentCampaignController {

    private final CampaignService campaignService;

    @GetMapping("/")
    @Operation(summary = "Get campaign by id", description = "Retrieve a specific campaign by its name.")
    public Mono<ResponseEntity<Campaign>> getCampaign(@PathVariable final String id) {
        return campaignService.getCampaign(id)
            .map(campaign -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(campaign))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PutMapping("/")
    @Operation(summary = "Update an existing campaign", description = "Update the details of an existing campaign.")
    public Mono<ResponseEntity<Campaign>> updateCampaign(@PathVariable final String id, @RequestBody final Campaign campaign) {
        return campaignService.updateCampaign(id, campaign)
            .map(sk -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(sk))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
