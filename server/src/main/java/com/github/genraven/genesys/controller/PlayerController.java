package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.service.actor.PlayerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Player Controller", description = "Endpoints for managing players")
public class PlayerController extends AbstractController {
    
    private final PlayerService playerService;

    @GetMapping("/{id}")
    @Operation(summary = "Get player by id", description = "Retrieve a specific player by its name.")
    public Mono<ResponseEntity<Player>> getPlayer(@PathVariable final String id) {
        return playerService.getPlayer(id)
            .map(player -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(player))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping("/{name}")
    @Operation(summary = "Create a new player", description = "Create a new player with the specified name.")
    public Mono<ResponseEntity<Player>> createPlayer(@PathVariable final String name) {
        return playerService.createPlayer(name)
            .map(player -> ResponseEntity.created(getURI(player.getName())).body(player));
    }

    @PatchMapping("/creation/{id}/careers/")
    @Operation(summary = "Get player by id", description = "Retrieve a specific player by its name.")
    public Mono<ResponseEntity<Player>> getPlayer(@PathVariable final String id) {
        return playerService.getPlayer(id)
            .map(player -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(player))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
