package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.domain.actor.player.Archetype;
import com.github.genraven.genesys.domain.actor.player.Career;
import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.actor.player.PlayerSkill;
import com.github.genraven.genesys.domain.context.player.PlayerCreationArchetypeUpdateContext;
import com.github.genraven.genesys.domain.context.player.PlayerCreationCareerSkillUpdateContext;
import com.github.genraven.genesys.domain.context.player.PlayerCreationCareerUpdateContext;
import com.github.genraven.genesys.domain.response.PlayerResponse;
import com.github.genraven.genesys.exceptions.BaseException;
import com.github.genraven.genesys.service.actor.PlayerService;
import com.github.genraven.genesys.util.MapperUtil;
import com.github.genraven.genesys.validator.player.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.util.List;

import static org.springframework.web.reactive.function.BodyInserters.fromValue;

@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Player Controller", description = "Endpoints for managing players")
public class PlayerController extends AbstractController {
    
    private final PlayerService playerService;
    private final PlayerCreationCareerUpdateContextValidator playerCreationCareerUpdateContextValidator;
    private final PlayerCreationCareerSkillUpdateContextValidator playerCreationCareerSkillUpdateContextValidator;
    private final PlayerCreationArchetypeUpdateContextValidator playerCreationArchetypeUpdateContextValidator;
    private final PlayerCreationSkillUpdateContextValidator playerCreationSkillUpdateContextValidator;
    private final PlayerCreationCharacteristicUpdateContextValidator playerCreationCharacteristicUpdateContextValidator;
    private final PlayerCreationTalentUpdateContextValidator playerCreationTalentUpdateContextValidator;
    private final PlayerCreationResetExperienceContextValidator playerCreationResetExperienceContextValidator;

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
    @Operation(summary = "Patches Player Career during Creation.", description = "Updates the Player Career during Creation.")
    public Mono<ResponseEntity<PlayerResponse>> updatePlayerCareer(@PathVariable final String id, @RequestBody final Career career) {
        final Mono<Career> careerMono = Mono.just(career);
        return careerMono.zipWith(playerService.getPlayer(id))
            .map(tuple -> new PlayerCreationCareerUpdateContext(
                tuple.getT2(),
                tuple.getT1()
            ))
            .flatMap(playerCreationCareerUpdateContextValidator::validate)
            .flatMap(playerService::updatePlayerCareer)
            .flatMap(MapperUtil::mapPlayerToResponse)
            .map(player -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(player))
            .onErrorResume(BaseException.class, ex -> Mono.just(ResponseEntity.status(ex.getStatusCode())
                .contentType(MediaType.APPLICATION_JSON)
                .body(MapperUtil.mapErrorsToPlayerResponse(ex).block())));
    }

    @PatchMapping("/creation/{id}/careers/skills/")
    @Operation(summary = "Patches Player Career Skills during Creation.", description = "Updates the Player Career Skills during Creation.")
    public Mono<ResponseEntity<PlayerResponse>> updatePlayerCareerSkills(@PathVariable final String id, @RequestBody final List<PlayerSkill> playerSkills) {
        final Mono<List<PlayerSkill>> skillsMono = Mono.just(playerSkills);
        return skillsMono.zipWith(playerService.getPlayer(id))
            .map(tuple -> new PlayerCreationCareerSkillUpdateContext(
                tuple.getT2(),
                tuple.getT1()))
            .flatMap(playerCreationCareerSkillUpdateContextValidator::validate)
            .flatMap(playerService::updatePlayerCareerSkills)
            .flatMap(MapperUtil::mapPlayerToResponse)
            .map(player -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(player))
            .onErrorResume(BaseException.class, ex -> Mono.just(ResponseEntity.status(ex.getStatusCode())
                .contentType(MediaType.APPLICATION_JSON)
                .body(MapperUtil.mapErrorsToPlayerResponse(ex).block())));
    }

    @PatchMapping("/creation/{id}/archetypes/")
    @Operation(summary = "Patches Player Archetypes during Creation.", description = "Updates the Player Archetype during Creation.")
    public Mono<ResponseEntity<PlayerResponse>> updatePlayerCareer(@PathVariable final String id, @RequestBody final Archetype archetype) {
        final Mono<Archetype> archetypeMono =Mono.just(archetype);
        return archetypeMono.zipWith(playerService.getPlayer(id))
            .map(tuple -> new PlayerCreationArchetypeUpdateContext(
                tuple.getT2(),
                tuple.getT1()))
            .flatMap(playerCreationArchetypeUpdateContextValidator::validate)
            .flatMap(playerService::updatePlayerArchetype)
            .flatMap(MapperUtil::mapPlayerToResponse)
            .map(player -> ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(player))
            .onErrorResume(BaseException.class, ex -> Mono.just(ResponseEntity.status(ex.getStatusCode())
                .contentType(MediaType.APPLICATION_JSON)
                .body(MapperUtil.mapErrorsToPlayerResponse(ex).block())));
    }
}
