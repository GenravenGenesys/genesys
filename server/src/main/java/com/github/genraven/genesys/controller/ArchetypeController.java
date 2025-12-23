package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.domain.actor.player.Archetype;
import com.github.genraven.genesys.service.ArchetypeService;
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
@RequestMapping("/api/archetypes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Archetype Controller", description = "Endpoints for managing archetypes")
public class ArchetypeController extends AbstractController {

    private final ArchetypeService archetypeService;

    @GetMapping("/")
    @Operation(summary = "Get all archetypes", description = "Retrieve a list of all archetypes.")
    public Mono<ResponseEntity<List<Archetype>>> getAllArchetypes() {
        return archetypeService.getAllArchetypes()
            .collectList()
            .map(archetypes -> {
                if (CollectionUtils.isEmpty(archetypes)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(archetypes);
            });
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get archetype by id", description = "Retrieve a specific archetype by its name.")
    public Mono<ResponseEntity<Archetype>> getArchetype(@PathVariable final String id) {
        return archetypeService.getArchetype(id)
            .map(archetype -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(archetype))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping("/{name}")
    @Operation(summary = "Create a new archetype", description = "Create a new archetype with the specified name.")
    public Mono<ResponseEntity<Archetype>> createArchetype(@PathVariable final String name) {
        return archetypeService.createArchetype(name)
            .map(archetype -> ResponseEntity.created(getURI(archetype.getName())).body(archetype));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing archetype", description = "Update the details of an existing archetype.")
    public Mono<ResponseEntity<Archetype>> updateArchetype(@PathVariable final String id, @RequestBody final Archetype archetype) {
        return archetypeService.updateArchetype(id, archetype)
            .map(arch -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(arch))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
