package com.github.genraven.genesys.controller;

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
@RequestMapping("/api/skills")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Skill Controller", description = "Endpoints for managing skills")
public class SkillController extends AbstractController {

    private final SkillService skillService;

    @GetMapping("/")
    @Operation(summary = "Get all skills", description = "Retrieve a list of all skills.")
    public Mono<ResponseEntity<List<Skill>>> getAllSkills() {
        return skillService.getAllSkills()
            .collectList()
            .map(skills -> {
                if (CollectionUtils.isEmpty(skills)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(skills);
            });
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get skill by id", description = "Retrieve a specific skill by its name.")
    public Mono<ResponseEntity<Skill>> getSkill(@PathVariable final String id) {
        return skillService.getSkill(id)
            .map(skill -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(skill))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping("/{name}")
    @Operation(summary = "Create a new skill", description = "Create a new skill with the specified name.")
    public Mono<ResponseEntity<Skill>> createSkill(@PathVariable final String name) {
        return skillService.createSkill(name)
            .map(skill -> ResponseEntity.created(getURI(skill.getName())).body(skill));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing skill", description = "Update the details of an existing skill.")
    public Mono<ResponseEntity<Skill>> updateSkill(@PathVariable final String id, @RequestBody final Skill skill) {
        return skillService.updateSkill(id, skill)
            .map(sk -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(sk))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
