package com.github.genraven.genesys.controller;

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
@RequestMapping("/api/talents")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Talent Controller", description = "Endpoints for managing talents")
public class TalentController extends AbstractController {

    private final TalentService talentService;

    @GetMapping("/")
    @Operation(summary = "Get all talents", description = "Retrieve a list of all talents.")
    public Mono<ResponseEntity<List<Talent>>> getAllTalents() {
        return talentService.getAllTalents()
            .collectList()
            .map(talents -> {
                if (CollectionUtils.isEmpty(talents)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(talents);
            });
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get talent by id", description = "Retrieve a specific talent by its name.")
    public Mono<ResponseEntity<Talent>> getTalent(@PathVariable final String id) {
        return talentService.getTalent(id)
            .map(talent -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(talent))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping("/{name}")
    @Operation(summary = "Create a new talent", description = "Create a new talent with the specified name.")
    public Mono<ResponseEntity<Talent>> createTalent(@PathVariable final String name) {
        return talentService.createTalent(name)
            .map(talent -> ResponseEntity.created(getURI(talent.getName())).body(talent));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing talent", description = "Update the details of an existing talent.")
    public Mono<ResponseEntity<Talent>> updateTalent(@PathVariable final String id, @RequestBody final Talent talent) {
        return talentService.updateTalent(id, talent)
            .map(tal -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(tal))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
