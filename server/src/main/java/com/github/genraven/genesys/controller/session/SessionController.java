package com.github.genraven.genesys.controller.session;

import com.github.genraven.genesys.controller.AbstractController;
import com.github.genraven.genesys.domain.campaign.CampaignSession;
import com.github.genraven.genesys.service.SessionService;
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
@RequestMapping("/api/sessions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Sessions", description = "Endpoints for managing campaign sessions")
public class SessionController extends AbstractController {

    private final SessionService sessionService;

    @GetMapping(value = "/campaign/{campaignId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get all sessions for a campaign", description = "Retrieve a list of all sessions for a specific campaign.")
    public Mono<ResponseEntity<List<CampaignSession>>> getAllCampaignSessions(@PathVariable final String campaignId) {
        return sessionService.getAllCampaignSessions(campaignId)
                .collectList()
                .map(sessions -> {
                    if (CollectionUtils.isEmpty(sessions)) {
                        return ResponseEntity.noContent().build();
                    }
                    return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(sessions);
                });
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get  campaign session by id", description = "Retrieve a specific  campaign session by its id.")
    public Mono<ResponseEntity<CampaignSession>> getCampaignSession(@PathVariable final String id) {
        return sessionService.getCampaignSession(id)
                .map(campaign -> ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(campaign))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Create a new  campaign session", description = "Create a new  campaign session.")
    public Mono<ResponseEntity<CampaignSession>> createCampaignSession(@RequestBody final CampaignSession campaignSession) {
        return sessionService.createCampaignSession(campaignSession)
                .map(newCampaign -> ResponseEntity.created(getURI(newCampaign.getCampaignId())).body(newCampaign));
    }
}