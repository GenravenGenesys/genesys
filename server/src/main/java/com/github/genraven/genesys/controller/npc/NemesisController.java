package com.github.genraven.genesys.controller.npc;

import com.github.genraven.genesys.controller.AbstractController;
import com.github.genraven.genesys.domain.actor.ActorSkill;
import com.github.genraven.genesys.domain.actor.npc.Nemesis;
import com.github.genraven.genesys.service.actor.NemesisService;
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
@RequestMapping("/api/nemeses")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Nemesis Controller", description = "Endpoints for managing nemeses")
public class NemesisController extends AbstractController {
    
    private final NemesisService nemesisService;

    @GetMapping("/")
    @Operation(summary = "Get all nemeses", description = "Retrieve a list of all nemeses.")
    public Mono<ResponseEntity<List<Nemesis>>> getAllNemeses() {
        return nemesisService.getAllNemeses()
            .flatMap(MapperUtil::mapNemesisToResponse)
            .collectList()
            .map(nemeses -> {
                if (CollectionUtils.isEmpty(nemeses)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(nemeses);
            });
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get nemesis by id", description = "Retrieve a specific nemesis by its name.")
    public Mono<ResponseEntity<Nemesis>> getNemesis(@PathVariable final String id) {
        return nemesisService.getNemesis(id)
            .flatMap(MapperUtil::mapNemesisToResponse)
            .map(nemesis -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(nemesis))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping("/{name}")
    @Operation(summary = "Create a new nemesis", description = "Create a new nemesis with the specified name.")
    public Mono<ResponseEntity<Nemesis>> createNemesis(@PathVariable final String name) {
        return nemesisService.createNemesis(name)
            .flatMap(MapperUtil::mapNemesisToResponse)
            .map(nemesis -> ResponseEntity.created(getURI(nemesis.getName())).body(nemesis));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing nemesis", description = "Update the details of an existing nemesis.")
    public Mono<ResponseEntity<Nemesis>> updateNemesis(@PathVariable final String id, @RequestBody final Nemesis nemesis) {
        return nemesisService.updateNemesis(id, nemesis)
            .flatMap(MapperUtil::mapNemesisToResponse)
            .map(sk -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(sk))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/skills")
    @Operation(summary = "Patch skill of an existing nemesis", description = "Patch the skill of an existing nemesis.")
    public Mono<ResponseEntity<Nemesis>> updateNemesisSkill(@PathVariable final String id, @RequestBody final ActorSkill skill) {
        return nemesisService.updateNemesisSkill(id, skill)
            .flatMap(MapperUtil::mapNemesisToResponse)
            .map(nemesis -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(nemesis))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
