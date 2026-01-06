package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.response.CharacterResponse;
import com.github.genraven.genesys.service.CharacterService;
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
@RequestMapping("/api/characters")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Character Controller", description = "Endpoints for managing characters")
public class CharacterController {

    private final CharacterService characterService;

    @GetMapping("/")
    @Operation(summary = "Convert Players to Characters for Encounter", description = "Converts Players into Characters for an Encounter.")
    public Mono<ResponseEntity<List<CharacterResponse>>> getAllPlayersAsCharacters(@RequestBody final List<Player> players) {
        return characterService.mapPlayerToCharacter(players)
            .collectList()
            .map(characters -> {
                if (CollectionUtils.isEmpty(characters)) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(characters);
            });
    }
}
