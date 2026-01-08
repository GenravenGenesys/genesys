package com.github.genraven.genesys.controller.campaign;

import com.github.genraven.genesys.domain.skill.Skill;
import com.github.genraven.genesys.service.SkillService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/campaigns/{campaignId}/compendium/skills")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Skills", description = "Management of the campaign's custom skill library")
@RequiredArgsConstructor
public class SkillCompendiumController {

    private final SkillService skillService;

    @GetMapping
    @Operation(summary = "Get all skill templates", description = "Retrieves the full library of skills for this setting")
    public Flux<Skill> getSkills(@PathVariable final String campaignId) {
        return skillService.findAllByCampaignId(campaignId);
    }

    @PostMapping
    @Operation(summary = "Create a new skill", description = "Adds a custom skill definition to the campaign library")
    public Mono<ResponseEntity<Skill>> createSkill(@PathVariable final String campaignId, @RequestBody final Skill newSkill) {
        return skillService.addSkill(campaignId, newSkill)
            .map(saved -> ResponseEntity.status(HttpStatus.CREATED).body(saved));
    }

    @PatchMapping("/{skillId}")
    @Operation(summary = "Update a skill", description = "Performs a partial update on a specific skill template")
    public Mono<ResponseEntity<Skill>> updateSkill(@PathVariable final String campaignId, @PathVariable final String skillId,
                                                   @RequestBody final Skill updatedSkill) {
        return skillService.updateSkill(campaignId, skillId, updatedSkill)
            .map(ResponseEntity::ok)
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
