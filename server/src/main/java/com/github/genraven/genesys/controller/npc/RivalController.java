package com.github.genraven.genesys.controller.npc;

import com.github.genraven.genesys.controller.AbstractController;
import com.github.genraven.genesys.domain.actor.ActorSkill;
import com.github.genraven.genesys.domain.actor.npc.Rival;
import com.github.genraven.genesys.service.actor.RivalService;
import com.github.genraven.genesys.util.MapperUtil;
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
@RequestMapping("/api/rivals")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Rival Controller", description = "Endpoints for managing rivals")
public class RivalController extends AbstractController {
    
    private final RivalService rivalService;

    @GetMapping("/")
    @Operation(summary = "Get all rivals", description = "Retrieve a list of all rivals.")
    public Mono<ResponseEntity<List<Rival>>> getAllRivals() {
        return rivalService.getAllRivals()
            .flatMap(MapperUtil::mapRivalToResponse)
            .collectList()
            .map(rivals -> {
                if (CollectionUtils.isEmpty(rivals)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(rivals);
            });
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get rival by id", description = "Retrieve a specific rival by its name.")
    public Mono<ResponseEntity<Rival>> getRival(@PathVariable final String id) {
        return rivalService.getRival(id)
            .flatMap(MapperUtil::mapRivalToResponse)
            .map(rival -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(rival))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping("/{name}")
    @Operation(summary = "Create a new rival", description = "Create a new rival with the specified name.")
    public Mono<ResponseEntity<Rival>> createRival(@PathVariable final String name) {
        return rivalService.createRival(name)
            .flatMap(MapperUtil::mapRivalToResponse)
            .map(rival -> ResponseEntity.created(getURI(rival.getName())).body(rival));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing rival", description = "Update the details of an existing rival.")
    public Mono<ResponseEntity<Rival>> updateRival(@PathVariable final String id, @RequestBody final Rival rival) {
        return rivalService.updateRival(id, rival)
            .flatMap(MapperUtil::mapRivalToResponse)
            .map(sk -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(sk))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/skills")
    @Operation(summary = "Patch skill of an existing rival", description = "Patch the skill of an existing rival.")
    public Mono<ResponseEntity<Rival>> updateRivalSkill(@PathVariable final String id, @RequestBody final ActorSkill skill) {
        return rivalService.updateRivalSkill(id, skill)
            .flatMap(MapperUtil::mapRivalToResponse)
            .map(rival -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(rival))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
