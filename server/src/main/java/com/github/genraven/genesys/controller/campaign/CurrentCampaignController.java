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
    @Operation(summary = "Get current campaign", description = "Retrieve current campaign.")
    public Mono<ResponseEntity<Campaign>> getCurrentCampaign() {
        return campaignService.getCurrentCampaign()
            .map(campaign -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(campaign))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Sets an existing campaign as the current campaign", description = "Update the details of an existing campaign.")
    public Mono<ResponseEntity<Campaign>> setCurrentCampaign(@PathVariable final String id) {
        return campaignService.setCurrentCampaign(id)
            .map(sk -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(sk))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
