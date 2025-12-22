package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.domain.skill.Skill;
import com.github.genraven.genesys.service.SkillService;
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
@RequestMapping("/api/campaigns/skills")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Campaign Skill Controller", description = "Endpoints for managing campaign skills")
public class CampaignSkillController {

    private final SkillService skillService;

    @GetMapping("/")
    @Operation(summary = "Get all skills for current campaign", description = "Retrieve a list of all skills for current campaign.")
    public Mono<ResponseEntity<List<Skill>>> getSkillsForCurrentCampaign() {
        return skillService.getSkillsForCurrentCampaign()
            .map(skills -> {
                if (CollectionUtils.isEmpty(skills)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(skills);
            });
    }

    @PostMapping("/{id}")
    @Operation(summary = "Add Skill to Campaign", description = "Adds a Skill to the current Campaign.")
    public Mono<ResponseEntity<Campaign>> addSkillToCurrentCampaign(@PathVariable final String id) {
        return skillService.addSkillToCurrentCampaign(id)
            .map(sk -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(sk))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
