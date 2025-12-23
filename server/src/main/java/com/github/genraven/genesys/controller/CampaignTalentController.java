package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.domain.talent.Talent;
import com.github.genraven.genesys.service.TalentService;
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
@RequestMapping("/api/campaigns/talents")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Campaign Talent Controller", description = "Endpoints for managing campaign talents")
public class CampaignTalentController {

    private final TalentService talentService;

    @GetMapping("/")
    @Operation(summary = "Get all skills for current campaign", description = "Retrieve a list of all skills for current campaign.")
    public Mono<ResponseEntity<List<Talent>>> getTalentsForCurrentCampaign() {
        return talentService.getTalentsForCurrentCampaign()
            .map(talents -> {
                if (CollectionUtils.isEmpty(talents)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(talents);
            });
    }

    @PostMapping("/{id}")
    @Operation(summary = "Add Talent to Campaign", description = "Adds a Talent to the current Campaign.")
    public Mono<ResponseEntity<Campaign>> addSkillToCurrentCampaign(@PathVariable final String id) {
        return talentService.addTalentToCurrentCampaign(id)
            .map(campaign -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(campaign))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping("/tiers/{tier}")
    @Operation(summary = "Get all talents for current campaign of tier", description = "Retrieve a list of all talent for current campaign of a specific tier.")
    public Mono<ResponseEntity<List<Talent>>> getSkillsForCurrentCampaign(@PathVariable final Talent.Tier tier) {
        return talentService.getTalentsForCurrentCampaignByTier(tier)
            .map(talents -> {
                if (CollectionUtils.isEmpty(talents)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(talents);
            });
    }
}
