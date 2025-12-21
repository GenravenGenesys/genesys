package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.domain.CriticalInjury;
import com.github.genraven.genesys.service.InjuryService;
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
@RequestMapping("/api/injuries")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Injury Controller", description = "Endpoints for managing injuries")
public class InjuryController extends AbstractController {

    private final InjuryService injuryService;

    @GetMapping("/")
    @Operation(summary = "Get all injuries", description = "Retrieve a list of all critical injuries that can be applied to characters.")
    public Mono<ResponseEntity<List<CriticalInjury>>> getAllInjuries() {
        return injuryService.getAllInjuries()
            .collectList()
            .map(injuries -> {
                if (CollectionUtils.isEmpty(injuries)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(injuries);
            });
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get injury by id", description = "Retrieve a specific critical injury by its name.")
    public Mono<ResponseEntity<CriticalInjury>> getInjuryById(@PathVariable final String id) {
        return injuryService.getInjury(id)
            .map(injury -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(injury))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping("/{name}")
    @Operation(summary = "Create a new injury", description = "Create a new critical injury with the specified name.")
    public Mono<ResponseEntity<CriticalInjury>> createInjury(@PathVariable final String name) {
        return injuryService.createInjury(name)
            .map(injury -> ResponseEntity.created(getURI(injury.getName())).body(injury));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing injury", description = "Update the details of an existing critical injury.")
    public Mono<ResponseEntity<CriticalInjury>> updateInjury(@PathVariable final String id, @RequestBody final CriticalInjury criticalInjury) {
        return injuryService.updateInjury(id, criticalInjury)
            .map(injury -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(injury))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
