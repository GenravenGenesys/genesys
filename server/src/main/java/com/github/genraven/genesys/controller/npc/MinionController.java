package com.github.genraven.genesys.controller.npc;

import com.github.genraven.genesys.controller.AbstractController;
import com.github.genraven.genesys.domain.actor.npc.GroupSkill;
import com.github.genraven.genesys.domain.actor.npc.Minion;
import com.github.genraven.genesys.service.actor.MinionService;
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
@RequestMapping("/api/minions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Minion Controller", description = "Endpoints for managing minions")
public class MinionController extends AbstractController {

    private final MinionService minionService;

    @GetMapping("/")
    @Operation(summary = "Get all minions", description = "Retrieve a list of all minions.")
    public Mono<ResponseEntity<List<Minion>>> getAllMinions() {
        return minionService.getAllMinions()
            .flatMap(MapperUtil::mapMinionToResponse)
            .collectList()
            .map(minions -> {
                if (CollectionUtils.isEmpty(minions)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(minions);
            });
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get minion by id", description = "Retrieve a specific minion by its name.")
    public Mono<ResponseEntity<Minion>> getMinion(@PathVariable final String id) {
        return minionService.getMinion(id)
            .flatMap(MapperUtil::mapMinionToResponse)
            .map(minion -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(minion))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

//    @PostMapping("/{name}")
//    @Operation(summary = "Create a new minion", description = "Create a new minion with the specified name.")
//    public Mono<ResponseEntity<Minion>> createMinion(@PathVariable final String name) {
//        return minionService.createMinion(name)
//            .flatMap(MapperUtil::mapMinionToResponse)
//            .map(minion -> ResponseEntity.created(getURI(minion.getName())).body(minion));
//    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing minion", description = "Update the details of an existing minion.")
    public Mono<ResponseEntity<Minion>> updateMinion(@PathVariable final String id, @RequestBody final Minion minion) {
        return minionService.updateMinion(id, minion)
            .flatMap(MapperUtil::mapMinionToResponse)
            .map(sk -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(sk))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/skills")
    @Operation(summary = "Patch skill of an existing minion", description = "Patch the skill of an existing minion.")
    public Mono<ResponseEntity<Minion>> updateMinionSkill(@PathVariable final String id, @RequestBody final GroupSkill skill) {
        return minionService.updateMinionSkill(id, skill)
            .flatMap(MapperUtil::mapMinionToResponse)
            .map(minion -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(minion))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
