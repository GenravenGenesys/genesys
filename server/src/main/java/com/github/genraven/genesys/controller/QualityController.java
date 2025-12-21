package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.domain.equipment.Quality;
import com.github.genraven.genesys.service.QualityService;
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
@RequestMapping("/api/qualities")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Quality Controller", description = "Endpoints for managing qualities")
public class QualityController extends AbstractController {

    private final QualityService qualityService;

    @GetMapping("/")
    @Operation(summary = "Get all qualities", description = "Retrieve a list of all qualities that can be applied to equipment.")
    public Mono<ResponseEntity<List<Quality>>> getAllQualities() {
        return qualityService.getAllQualities()
            .collectList()
            .map(qualities -> {
                if (CollectionUtils.isEmpty(qualities)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(qualities);
            });
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get quality by id", description = "Retrieve a specific quality by its name.")
    public Mono<ResponseEntity<Quality>> getQuality(@PathVariable final String id) {
        return qualityService.getQuality(id)
            .map(quality -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(quality))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping("/{name}")
    @Operation(summary = "Create a new quality", description = "Create a new quality with the specified name.")
    public Mono<ResponseEntity<Quality>> createQuality(@PathVariable final String name) {
        return qualityService.createQuality(name)
            .map(quality -> ResponseEntity.created(getURI(quality.getName())).body(quality));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing quality", description = "Update the details of an existing quality.")
    public Mono<ResponseEntity<Quality>> updateQuality(@PathVariable final String id, @RequestBody final Quality quality) {
        return qualityService.updateQuality(id, quality)
            .map(qual -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(qual))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
